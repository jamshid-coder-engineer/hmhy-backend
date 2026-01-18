"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherController = void 0;
const common_1 = require("@nestjs/common");
const teacher_service_1 = require("./teacher.service");
const jwt_1 = require("@nestjs/jwt");
const swagger_1 = require("@nestjs/swagger");
const send_otp_dto_1 = require("./dto/send-otp.dto");
const verify_otp_dto_1 = require("./dto/verify-otp.dto");
const change_password_dto_1 = require("./dto/change-password.dto");
const update_teacher_dto_1 = require("./dto/update-teacher.dto");
const soft_delete_dto_1 = require("./dto/soft-delete.dto");
const roles_decorator_1 = require("../../common/decorator/roles.decorator");
const index_enum_1 = require("../../common/enum/index.enum");
const role_guard_1 = require("../../common/guard/role.guard");
const auth_guard_1 = require("../../common/guard/auth.guard");
const passport_1 = require("@nestjs/passport");
const current_user_decorator_1 = require("../../common/decorator/current-user.decorator");
const otp_generator_1 = require("../../common/util/otp-generator");
const mailer_1 = require("@nestjs-modules/mailer");
const login_teacher_dto_1 = require("./dto/login-teacher.dto");
const teacher_filter_dto_1 = require("./dto/teacher-filter.dto");
let TeacherController = class TeacherController {
    teacherService;
    jwtService;
    mailService;
    constructor(teacherService, jwtService, mailService) {
        this.teacherService = teacherService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    googleLogin() {
    }
    async googleCallback(req, res) {
        const googleUser = req.user;
        console.log('📧 Google User Email:', googleUser.email);
        console.log('🌐 FRONTEND_URL:', process.env.FRONTEND_URL);
        try {
            await this.teacherService.createIncompleteGoogleTeacher({
                email: googleUser.email,
                fullName: googleUser.fullName,
                googleId: googleUser.googleId,
                imageUrl: googleUser.imageUrl,
                accessToken: googleUser.accessToken,
                refreshToken: googleUser.refreshToken,
            });
            const teacher = await this.teacherService.findCompleteGoogleTeacher(googleUser.email);
            if (teacher?.isComplete && teacher?.isActive) {
                const token = this.jwtService.sign({
                    id: teacher.id,
                    email: teacher.email,
                    role: teacher.role,
                });
                const redirectUrl = `${process.env.FRONTEND_URL}/teacher/lesson?token=${encodeURIComponent(token)}`;
                return res.redirect(redirectUrl);
            }
            const redirectUrl = `${process.env.FRONTEND_URL}/teacher/otp-verify?email=${encodeURIComponent(googleUser.email)}`;
            console.log('Redirecting to OTP:', redirectUrl);
            return res.redirect(redirectUrl);
        }
        catch (error) {
            console.error('Google Callback Error:', error);
            const redirectUrl = `${process.env.FRONTEND_URL}/teacher/login?error=${encodeURIComponent(error.message)}`;
            console.log('Redirecting to Login with error:', redirectUrl);
            return res.redirect(redirectUrl);
        }
    }
    async login(dto) {
        const teacher = await this.teacherService.validateTeacher(dto.email, dto.password);
        if (teacher.role !== index_enum_1.Roles.TEACHER) {
            throw new common_1.UnauthorizedException('You are not a teacher');
        }
        if (!teacher.isComplete) {
            throw new common_1.UnauthorizedException('Profile is not completed');
        }
        if (!teacher.isActive) {
            throw new common_1.UnauthorizedException('Waiting for admin approval');
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
    async sendOtp(body) {
        const teacher = await this.teacherService.findByEmail(body.email);
        if (!teacher)
            throw new common_1.BadRequestException('Email topilmadi');
        const phoneCheck = await this.teacherService.findTeacherByPhone(body.phoneNumber);
        if (phoneCheck)
            throw new common_1.ConflictException('Telefon raqami band');
        const otp = (0, otp_generator_1.generateOtp)();
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
    async verifyOtp(body) {
        return {
            message: "Ro'yxatdan o'tish yakunlandi",
            status: 'Pending Admin Approval',
        };
    }
    findAll(query) {
        return this.teacherService.findFilteredTeachers(query);
    }
    softDelete(id, dto, admin) {
        return this.teacherService.softDelete(id, dto, admin.id);
    }
    findAllApplications() {
        return this.teacherService.findAll({ where: { isActive: false } });
    }
    getMe(user) {
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
    teacherActivate(id) {
        return this.teacherService.updateStatus(id);
    }
    findAllDeleted() {
        return this.teacherService.findAll({ where: { isDelete: true } });
    }
    restoreTeacher(id) {
        return this.teacherService.restoreTeacher(id);
    }
    findOne(id) {
        return this.teacherService.findOneById(id);
    }
    hardDelete(id) {
        return this.teacherService.delete(id);
    }
    update(user, dto) {
        return this.teacherService.updateTeacher(user.id, dto);
    }
    changePassword(user, dto) {
        return this.teacherService.changePassword(user.id, dto);
    }
};
exports.TeacherController = TeacherController;
__decorate([
    (0, common_1.Get)('google'),
    (0, swagger_1.ApiOperation)({ summary: 'Google OAuth login' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "googleCallback", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_teacher_dto_1.LoginTeacherDto]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('google/send-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_otp_dto_1.SendOtpDto]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "sendOtp", null);
__decorate([
    (0, common_1.Post)('google/verify-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_otp_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "verifyOtp", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN, index_enum_1.Roles.ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [teacher_filter_dto_1.TeacherFilterDto]),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN, index_enum_1.Roles.ADMIN),
    (0, common_1.Patch)('soft-delete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, soft_delete_dto_1.SoftDeleteDto, Object]),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "softDelete", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN, index_enum_1.Roles.ADMIN),
    (0, common_1.Get)('applications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "findAllApplications", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.TEACHER),
    (0, common_1.Get)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "getMe", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN, index_enum_1.Roles.ADMIN),
    (0, common_1.Patch)('activate/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "teacherActivate", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN),
    (0, common_1.Get)('deleted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "findAllDeleted", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN),
    (0, common_1.Patch)('restore/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "restoreTeacher", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN, index_enum_1.Roles.ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN),
    (0, common_1.Delete)('hard-delete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "hardDelete", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.TEACHER),
    (0, common_1.Patch)('update'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_teacher_dto_1.UpdateTeacherDto]),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.TEACHER),
    (0, common_1.Patch)('changePassword'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "changePassword", null);
exports.TeacherController = TeacherController = __decorate([
    (0, swagger_1.ApiTags)('Teacher - Google OAuth'),
    (0, common_1.Controller)('teacher'),
    __metadata("design:paramtypes", [teacher_service_1.TeacherService,
        jwt_1.JwtService,
        mailer_1.MailerService])
], TeacherController);
//# sourceMappingURL=teacher.controller.js.map