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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../infrastructure/base/base-service");
const teacher_entity_1 = require("../../core/entity/teacher.entity");
const typeorm_1 = require("@nestjs/typeorm");
const crypto_service_1 = require("../../infrastructure/crypto/crypto.service");
const ioredis_1 = __importDefault(require("ioredis"));
const success_response_1 = require("../../infrastructure/response/success.response");
const ioredis_2 = require("@nestjs-modules/ioredis");
const typeorm_2 = require("typeorm");
let TeacherService = class TeacherService extends base_service_1.BaseService {
    teacherRepo;
    redis;
    crypto;
    constructor(teacherRepo, redis, crypto) {
        super(teacherRepo);
        this.teacherRepo = teacherRepo;
        this.redis = redis;
        this.crypto = crypto;
    }
    async createIncompleteGoogleTeacher(data) {
        let teacher = await this.teacherRepo.findOne({
            where: { email: data.email },
        });
        if (!teacher) {
            teacher = this.teacherRepo.create({
                email: data.email,
                fullName: data.fullName,
                googleId: data.googleId,
                imageUrl: data.imageUrl,
                googleAccessToken: data.accessToken,
                googleRefreshToken: data.refreshToken,
                isComplete: false,
                isActive: false,
            });
        }
        else {
            teacher.googleAccessToken = data.accessToken;
            if (data.refreshToken) {
                teacher.googleRefreshToken = data.refreshToken;
            }
            teacher.imageUrl = data.imageUrl;
            teacher.fullName = data.fullName;
        }
        return await this.teacherRepo.save(teacher);
    }
    async findTeacherByPhone(phoneNumber) {
        return await this.teacherRepo.findOne({ where: { phoneNumber } });
    }
    async validateTeacher(email, password) {
        const teacher = await this.teacherRepo.findOne({
            where: { email },
        });
        if (!teacher) {
            throw new common_1.UnauthorizedException('Teacher not found');
        }
        const isMatch = await this.crypto.compare(password, teacher.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return teacher;
    }
    async saveOtpToRedis(phoneNumber, data) {
        const key = `otp:google:${phoneNumber}`;
        try {
            await this.redis.set(key, JSON.stringify(data), 'EX', 120);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Redis-ga saqlashda xatolik');
        }
    }
    async getOtpFromRedis(phoneNumber) {
        const key = `otp:google:${phoneNumber}`;
        const data = await this.redis.get(key);
        return data ? JSON.parse(data) : null;
    }
    async deleteOtpFromRedis(phoneNumber) {
        const key = `otp:google:${phoneNumber}`;
        await this.redis.del(key);
    }
    async findCompleteGoogleTeacher(email) {
        return await this.teacherRepo.findOne({ where: { email } });
    }
    async findByEmail(email) {
        return await this.teacherRepo.findOne({ where: { email } });
    }
    async activateTeacher(email, phoneNumber, password) {
        const teacher = await this.teacherRepo.findOne({ where: { email } });
        if (!teacher)
            throw new common_1.NotFoundException('Foydalanuvchi topilmadi');
        const hashedPassword = await this.crypto.encrypt(password);
        teacher.phoneNumber = phoneNumber;
        teacher.password = hashedPassword;
        teacher.isComplete = true;
        teacher.isActive = false;
        return await this.teacherRepo.save(teacher);
    }
    async findFilteredTeachers(query) {
        const { search, level, minRating, maxRating, sortBy, sortOrder, page, limit } = query;
        const where = {};
        if (search) {
            where.fullName = (0, typeorm_2.ILike)(`%${search}%`);
        }
        if (level) {
            where.level = level;
        }
        if (minRating !== undefined && maxRating !== undefined) {
            where.rating = (0, typeorm_2.Between)(minRating, maxRating);
        }
        const options = {
            where,
            take: limit,
            skip: page,
            order: {
                [sortBy || 'fullName']: sortOrder || 'ASC',
            },
            select: {
                id: true,
                cardNumber: true,
                description: true,
                email: true,
                fullName: true,
                phoneNumber: true,
                experience: true,
                hourPrice: true,
                isActive: true,
                imageUrl: true,
                level: true,
                portfolioLink: true,
                rating: true,
                specification: true,
            },
        };
        return this.findAllWithPagination(options);
    }
    async updateTeacher(id, dto) {
        const { phoneNumber, cardNumber } = dto;
        const teacher = await this.teacherRepo.findOne({ where: { id } });
        if (!teacher)
            throw new common_1.NotFoundException('Teacher not found');
        if (phoneNumber) {
            const existsPhoneNumber = await this.teacherRepo.findOne({
                where: { phoneNumber },
            });
            if (existsPhoneNumber && existsPhoneNumber.id !== id)
                throw new common_1.ConflictException('Phone number aready exists');
        }
        if (cardNumber) {
            const existsCardNumber = await this.teacherRepo.findOne({
                where: { phoneNumber },
            });
            if (existsCardNumber && existsCardNumber.id !== id)
                throw new common_1.ConflictException('Phone number aready exists');
        }
        const updatedTeacher = await this.teacherRepo.update(id, dto);
        return (0, success_response_1.successRes)(updatedTeacher);
    }
    async changePassword(id, dto) {
        const { currentPassword, newPassword } = dto;
        const teacher = await this.teacherRepo.findOne({ where: { id } });
        if (!teacher)
            throw new common_1.NotFoundException('Teacher not found');
        const isMatchPassword = await this.crypto.decrypt(currentPassword, teacher.password);
        if (!isMatchPassword)
            throw new common_1.BadRequestException('Current password incorrect');
        const hashedPassword = await this.crypto.encrypt(newPassword);
        teacher.password = hashedPassword;
        await this.teacherRepo.update(id, { password: hashedPassword });
        return (0, success_response_1.successRes)({ message: 'Password successfully changed!' });
    }
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __param(1, (0, ioredis_2.InjectRedis)()),
    __metadata("design:paramtypes", [Object, ioredis_1.default,
        crypto_service_1.CryptoService])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map