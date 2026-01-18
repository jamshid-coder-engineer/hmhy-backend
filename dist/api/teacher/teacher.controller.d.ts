import { TeacherService } from './teacher.service';
import { JwtService } from '@nestjs/jwt';
import type { Response, Request } from 'express';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { SoftDeleteDto } from './dto/soft-delete.dto';
import { Roles } from 'src/common/enum/index.enum';
import type { IToken } from 'src/infrastructure/token/interface';
import Redis from 'ioredis';
import { MailerService } from '@nestjs-modules/mailer';
import { LoginTeacherDto } from './dto/login-teacher.dto';
import { TeacherFilterDto } from './dto/teacher-filter.dto';
export declare class TeacherController {
    private teacherService;
    private jwtService;
    private readonly mailService;
    private readonly redis;
    constructor(teacherService: TeacherService, jwtService: JwtService, mailService: MailerService, redis: Redis);
    googleLogin(): void;
    googleCallback(req: Request, res: Response): Promise<void>;
    login(dto: LoginTeacherDto): Promise<{
        token: string;
        role: Roles.TEACHER;
        username: string;
    }>;
    sendOtp(body: SendOtpDto): Promise<{
        message: string;
    }>;
    verifyOtp(body: VerifyOtpDto): Promise<{
        message: string;
        status: string;
        teacherId: string;
    }>;
    findAll(query: TeacherFilterDto): Promise<import("../../infrastructure/pagination/successResponse").IResponsePagination>;
    softDelete(id: string, dto: SoftDeleteDto, admin: IToken): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    findAllApplications(): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    getMe(user: IToken): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    teacherActivate(id: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    findAllDeleted(): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    restoreTeacher(id: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    findOne(id: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    hardDelete(id: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    update(user: IToken, dto: UpdateTeacherDto): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    changePassword(user: IToken, dto: ChangePasswordDto): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
}
