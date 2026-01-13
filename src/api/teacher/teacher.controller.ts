import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  ConflictException,
  BadRequestException,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { JwtService } from '@nestjs/jwt';
import type { Response, Request } from 'express';
import { config } from 'src/config';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { SoftDeleteDto } from './dto/soft-delete.dto';
import { AccessRoles } from 'src/common/decorator/roles.decorator';
import { Roles } from 'src/common/enum/index.enum';
import { RolesGuard } from 'src/common/guard/role.guard';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { AuthGuard as AuthPassportGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import type { IToken } from 'src/infrastructure/token/interface';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { generateOtp } from 'src/common/util/otp-generator';
import passport from 'passport';
import { MailerService } from '@nestjs-modules/mailer';
import { LoginTeacherDto } from './dto/login-teacher.dto';
import { tr } from '@faker-js/faker';
import { TeacherFilterDto } from './dto/teacher-filter.dto';

@ApiTags('Teacher - Google OAuth')
@Controller('teacher')
export class TeacherController {
  constructor(
    private teacherService: TeacherService,
    private jwtService: JwtService,
    private readonly mailService: MailerService,
    @InjectRedis() private readonly redis: Redis,
  ) { }



  @Get('google')
  @ApiOperation({ summary: 'Google OAuth login' })
  @UseGuards(AuthPassportGuard('google'))
  googleLogin() {

  }
  @Get('google/callback')
  @UseGuards(AuthPassportGuard('google'))
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const googleUser = req.user as any;

    console.log('📧 Google User Email:', googleUser.email)
    console.log('🌐 FRONTEND_URL:', process.env.FRONTEND_URL)

    try {
      await this.teacherService.createIncompleteGoogleTeacher({
        email: googleUser.email,
        fullName: googleUser.fullName,
        googleId: googleUser.googleId,
        imageUrl: googleUser.imageUrl,
        accessToken: googleUser.accessToken,
        refreshToken: googleUser.refreshToken,
      });

      const teacher = await this.teacherService.findCompleteGoogleTeacher(
        googleUser.email,
      );

      if (teacher?.isComplete && teacher?.isActive) {
        const token = this.jwtService.sign({
          id: teacher.id,
          email: teacher.email,
          role: teacher.role,
        });

        const redirectUrl = `${process.env.FRONTEND_URL}/teacher/dashboard?token=${token}`
        console.log('✅ Redirecting to Dashboard:', redirectUrl)

        return res.redirect(redirectUrl);
      }

      const redirectUrl = `${process.env.FRONTEND_URL}/teacher/otp-verify?email=${encodeURIComponent(googleUser.email)}`
      console.log('✅ Redirecting to OTP:', redirectUrl)

      return res.redirect(redirectUrl);
    } catch (error: any) {
      console.error('❌ Google Callback Error:', error)

      const redirectUrl = `${process.env.FRONTEND_URL}/teacher/login?error=${encodeURIComponent(error.message)}`
      console.log('❌ Redirecting to Login with error:', redirectUrl)

      return res.redirect(redirectUrl);
    }
  }

  @Post('login')
  async login(@Body() dto: LoginTeacherDto) {
    const teacher = await this.teacherService.validateTeacher(
      dto.email,
      dto.password,
    );

    if (teacher.role !== Roles.TEACHER) {
      throw new UnauthorizedException('You are not a teacher');
    }

    if (!teacher.isComplete) {
      throw new UnauthorizedException('Profile is not completed');
    }

    if (!teacher.isActive) {
      throw new UnauthorizedException('Waiting for admin approval');
    }

    const token = this.jwtService.sign({
      id: teacher.id,
      email: teacher.email,
      role: teacher.role,
    });

    return {
      token,
      role: teacher.role,
    };
  }

  @Post('google/send-otp')
  async sendOtp(@Body() body: SendOtpDto) {
    const teacher = await this.teacherService.findByEmail(body.email);
    if (!teacher) throw new BadRequestException('Email topilmadi');

    const phoneCheck = await this.teacherService.findTeacherByPhone(
      body.phoneNumber,
    );
    if (phoneCheck) throw new ConflictException('Telefon raqami band');

    const otp = generateOtp();

    await this.redis.set(
      `otp:google:${body.email}`,
      JSON.stringify({
        otp,
        phoneNumber: body.phoneNumber,
        password: body.password,
      }),
      'EX',
      300,
    );

    await this.mailService.sendMail({
      to: body.email,
      subject: 'Royxatdan otish uchun tasdiqlash kodi',

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2>Tasdiqlash kodi</h2>
          <p>Sizning ro'yxatdan o'tish kodingiz:</p>
          <h1 style="color: #4CAF50;">${otp}</h1>
          <p>Ushbu kod 5 daqiqa davomida amal qiladi.</p>
        </div>
      `,
    });

    return { message: 'OTP emailingizga yuborildi' };
  }

  @Post('google/verify-otp')
  async verifyOtp(@Body() body: VerifyOtpDto) {
    const data = await this.redis.get(`otp:google:${body.email}`);
    if (!data) throw new BadRequestException('OTP muddati otgan');

    const parsed = JSON.parse(data);
    if (parsed.otp !== body.otp) throw new BadRequestException('OTP notogri');

    const teacher = await this.teacherService.activateTeacher(
      body.email,
      parsed.phoneNumber,
      parsed.password,
    );

    await this.redis.del(`otp:google:${body.email}`);

    return {
      message: "Ro'yxatdan o'tish yakunlandi",
      status: 'Pending Admin Approval',
      teacherId: teacher.id,
    };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPER_ADMIN, Roles.ADMIN)
  @Get()
  findAll(@Query() query: TeacherFilterDto) {
    return this.teacherService.findFilteredTeachers(query);
  }



  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPER_ADMIN, Roles.ADMIN)
  @Patch('soft-delete/:id')
  softDelete(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: SoftDeleteDto,
    @CurrentUser() admin: IToken,
  ) {
    return this.teacherService.softDelete(id, dto, admin.id);
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard, RolesGuard)
  // @AccessRoles(Roles.SUPER_ADMIN, Roles.ADMIN)
  // @Get()
  // findAll() {
  //   return this.teacherService.findAll({
  //     where: { isDelete: false },
  //     select: {
  //       id: true,
  //       cardNumber: true,
  //       description: true,
  //       email: true,
  //       isActive: true,
  //       fullName: true,
  //       phoneNumber: true,
  //       experience: true,
  //       hourPrice: true,
  //       imageUrl: true,
  //       level: true,
  //       portfolioLink: true,
  //       rating: true,
  //       specification: true,
  //     },
  //   });
  // }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPER_ADMIN, Roles.ADMIN)
  @Get('applications')
  findAllApplications() {
    return this.teacherService.findAll({ where: { isActive: false } });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPER_ADMIN, Roles.ADMIN)
  @Patch('activate/:id')
  teacherActivate(@Param('id', ParseUUIDPipe) id: string) {
    return this.teacherService.updateStatus(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPER_ADMIN)
  @Get('deleted')
  findAllDeleted() {
    return this.teacherService.findAll({ where: { isDelete: true } });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPER_ADMIN)
  @Patch('restore/:id')
  restoreTeacher(@Param('id', ParseUUIDPipe) id: string) {
    return this.teacherService.restoreTeacher(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPER_ADMIN, Roles.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.teacherService.findOneById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPER_ADMIN)
  @Delete('hard-delete/:id')
  hardDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.teacherService.delete(id);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.TEACHER)
  @Get('me')
  getMe(@CurrentUser() user: IToken) {
    return this.teacherService.findOneById(user.id, {
      select: {
        cardNumber: true,
        description: true,
        email: true,
        fullName: true,
        phoneNumber: true,
        experience: true,
        hourPrice: true,
        imageUrl: true,
        level: true,
        portfolioLink: true,
        rating: true,
        specification: true,
      },
    });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.TEACHER)
  @Patch('update')
  update(@CurrentUser() user: IToken, @Body() dto: UpdateTeacherDto) {
    return this.teacherService.updateTeacher(user.id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.TEACHER)
  @Patch('changePassword')
  changePassword(@CurrentUser() user: IToken, @Body() dto: ChangePasswordDto) {
    return this.teacherService.changePassword(user.id, dto);
  }
}
