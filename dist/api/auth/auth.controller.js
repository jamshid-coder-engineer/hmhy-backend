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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const admin_signIn_dto_1 = require("./dto/admin-signIn.dto");
const teacher_signIn_dto_1 = require("./dto/teacher-signIn.dto");
const role_guard_1 = require("../../common/guard/role.guard");
const index_enum_1 = require("../../common/enum/index.enum");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../common/decorator/roles.decorator");
const cookie_getter_decorator_1 = require("../../common/decorator/cookie-getter.decorator");
const auth_guard_1 = require("../../common/guard/auth.guard");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    adminSignIn(dto, res) {
        return this.authService.adminSignIn(dto, res);
    }
    teacherSignIn(dto, res) {
        return this.authService.teacherSignIn(dto, res);
    }
    loginTelegram(initData) {
        return this.authService.telegramLogin(initData);
    }
    devLogin(studentId, res) {
        return this.authService.devLogin(studentId, res);
    }
    newToken(token) {
        return this.authService.newToken(token);
    }
    signOut(token, res) {
        return this.authService.signOut(token, res, 'token');
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Admin sign in' }),
    (0, swagger_1.ApiBody)({ type: admin_signIn_dto_1.AdminSignInDto }),
    (0, common_1.Post)('signin/admin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_signIn_dto_1.AdminSignInDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "adminSignIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Teacher sign in' }),
    (0, swagger_1.ApiBody)({ type: teacher_signIn_dto_1.TeacherSignInDto }),
    (0, common_1.Post)('signin/teacher'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [teacher_signIn_dto_1.TeacherSignInDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "teacherSignIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Telegram Web App login (Production)' }),
    (0, swagger_1.ApiBody)({ schema: { properties: { initData: { type: 'string' } } } }),
    (0, common_1.Post)('telegram/login'),
    __param(0, (0, common_1.Body)('initData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loginTelegram", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'TEST UCHUN: Student ID orqali token olish' }),
    (0, swagger_1.ApiBody)({ schema: { properties: { studentId: { type: 'string' } } } }),
    (0, common_1.Post)('dev/login'),
    __param(0, (0, common_1.Body)('studentId')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "devLogin", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.ADMIN, index_enum_1.Roles.SUPER_ADMIN, index_enum_1.Roles.TEACHER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get new token using refresh token' }),
    (0, common_1.Post)('new-token'),
    __param(0, (0, cookie_getter_decorator_1.CookieGetter)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "newToken", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.ADMIN, index_enum_1.Roles.SUPER_ADMIN, index_enum_1.Roles.TEACHER, index_enum_1.Roles.STUDENT),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Sign out user' }),
    (0, common_1.Post)('signout'),
    __param(0, (0, cookie_getter_decorator_1.CookieGetter)('token')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signOut", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map