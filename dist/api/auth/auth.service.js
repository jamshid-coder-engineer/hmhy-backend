"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("../../core/entity/admin.entity");
const teacher_entity_1 = require("../../core/entity/teacher.entity");
const student_entity_1 = require("../../core/entity/student.entity");
const crypto_service_1 = require("../../infrastructure/crypto/crypto.service");
const Token_1 = require("../../infrastructure/token/Token");
const success_response_1 = require("../../infrastructure/response/success.response");
const config_1 = require("../../config");
const crypto = __importStar(require("crypto"));
const index_enum_1 = require("../../common/enum/index.enum");
let AuthService = class AuthService {
    adminRepo;
    teacherRepo;
    studentRepo;
    crypto;
    token;
    constructor(adminRepo, teacherRepo, studentRepo, crypto, token) {
        this.adminRepo = adminRepo;
        this.teacherRepo = teacherRepo;
        this.studentRepo = studentRepo;
        this.crypto = crypto;
        this.token = token;
    }
    async adminSignIn(dto, res) {
        const { username, password } = dto;
        const admin = await this.adminRepo.findOne({ where: { username } });
        if (!admin)
            throw new common_1.BadRequestException('Username or password incorrect');
        const isMatchPass = await this.crypto.decrypt(password, admin.password);
        if (!isMatchPass)
            throw new common_1.BadRequestException('Username or password incorrect');
        const payload = { id: admin.id, role: admin.role };
        const accessToken = await this.token.accessToken(payload);
        const refreshToken = await this.token.refreshToken(payload);
        await this.token.writeCookie(res, 'token', refreshToken, 15);
        return (0, success_response_1.successRes)({
            accessToken,
            role: admin.role,
            username: admin.username,
        });
    }
    async teacherSignIn(dto, res) {
        const { email, password } = dto;
        const teacher = await this.teacherRepo.findOne({ where: { email } });
        const isMatchPass = await this.crypto.decrypt(password, teacher?.password ?? '');
        if (!teacher || !isMatchPass)
            throw new common_1.BadRequestException('Email or password incorrect');
        const payload = { id: teacher.id, isActive: teacher.isActive, role: teacher.role };
        const accessToken = await this.token.accessToken(payload);
        const refreshToken = await this.token.refreshToken(payload);
        await this.token.writeCookie(res, 'token', refreshToken, 30);
        return (0, success_response_1.successRes)(accessToken);
    }
    async telegramLogin(initData) {
        const urlParams = new URLSearchParams(initData);
        const hash = urlParams.get('hash');
        const userStr = urlParams.get('user');
        if (!hash || !userStr)
            throw new common_1.BadRequestException('Invalid initData');
        urlParams.delete('hash');
        const dataCheckString = Array.from(urlParams.entries())
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([key, val]) => `${key}=${val}`)
            .join('\n');
        const secretKey = crypto
            .createHmac('sha256', 'WebAppData')
            .update(config_1.config.TELEGRAM_BOT_TOKEN || '')
            .digest();
        const hmac = crypto
            .createHmac('sha256', secretKey)
            .update(dataCheckString)
            .digest('hex');
        if (hmac !== hash)
            throw new common_1.UnauthorizedException('Invalid hash');
        const tgUser = JSON.parse(userStr);
        const tgId = String(tgUser.id);
        const student = await this.studentRepo.findOne({
            where: { tgId },
        });
        if (!student)
            throw new common_1.UnauthorizedException('Student not registered. Please use /start command in bot first.');
        if (student.isBlocked) {
            throw new common_1.ForbiddenException(`Your account is blocked. Reason: ${student.blockedReason || 'Contact admin'}`);
        }
        const payload = {
            id: student.id,
            role: index_enum_1.Roles.STUDENT
        };
        const accessToken = await this.token.accessToken(payload);
        return (0, success_response_1.successRes)({
            accessToken,
            student: {
                id: student.id,
                firstName: student.firstName,
                lastName: student.lastName,
                phoneNumber: student.phoneNumber,
                tgUsername: student.tgUsername
            }
        });
    }
    async devLogin(studentId, res) {
        const student = await this.studentRepo.findOne({
            where: { id: studentId },
        });
        if (!student)
            throw new common_1.BadRequestException('Student not found');
        const payload = { id: student.id, role: index_enum_1.Roles.STUDENT };
        const accessToken = await this.token.accessToken(payload);
        const refreshToken = await this.token.refreshToken(payload);
        await this.token.writeCookie(res, "token", refreshToken, 30);
        return (0, success_response_1.successRes)({ accessToken });
    }
    async newToken(token) {
        const data = await this.token.verifyToken(token, config_1.config.TOKEN.REFRESH_TOKEN_KEY);
        if (!data)
            throw new common_1.UnauthorizedException('Refresh token expired');
        let user = null;
        if (data.role === 'STUDENT')
            user = await this.studentRepo.findOne({ where: { id: data.id } });
        else if (data.role === 'TEACHER')
            user = await this.teacherRepo.findOne({ where: { id: data.id } });
        else
            user = await this.adminRepo.findOne({ where: { id: data.id } });
        if (!user)
            throw new common_1.ForbiddenException('User not found');
        return (0, success_response_1.successRes)({
            token: await this.token.accessToken({ id: user.id, role: data.role }),
        });
    }
    async signOut(token, res, tokenKey) {
        res.clearCookie(tokenKey);
        return (0, success_response_1.successRes)({ message: 'Successfully logged out' });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __param(1, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __param(2, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [Object, Object, Object, crypto_service_1.CryptoService,
        Token_1.TokenService])
], AuthService);
//# sourceMappingURL=auth.service.js.map