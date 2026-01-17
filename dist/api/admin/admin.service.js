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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../infrastructure/base/base-service");
const admin_entity_1 = require("../../core/entity/admin.entity");
const typeorm_1 = require("@nestjs/typeorm");
const index_enum_1 = require("../../common/enum/index.enum");
const crypto_service_1 = require("../../infrastructure/crypto/crypto.service");
const config_1 = require("../../config");
const success_response_1 = require("../../infrastructure/response/success.response");
const student_entity_1 = require("../../core/entity/student.entity");
const lesson_entity_1 = require("../../core/entity/lesson.entity");
const teacher_entity_1 = require("../../core/entity/teacher.entity");
const teacherPayment_entity_1 = require("../../core/entity/teacherPayment.entity");
let AdminService = class AdminService extends base_service_1.BaseService {
    adminRepo;
    studentRepo;
    lessonRepo;
    teacherRepo;
    paymentRepo;
    crypto;
    constructor(adminRepo, studentRepo, lessonRepo, teacherRepo, paymentRepo, crypto) {
        super(adminRepo);
        this.adminRepo = adminRepo;
        this.studentRepo = studentRepo;
        this.lessonRepo = lessonRepo;
        this.teacherRepo = teacherRepo;
        this.paymentRepo = paymentRepo;
        this.crypto = crypto;
    }
    async onModuleInit() {
        const existsSuperAdmin = await this.adminRepo.findOne({
            where: { role: index_enum_1.Roles.SUPER_ADMIN },
        });
        if (!existsSuperAdmin) {
            const hashPassword = await this.crypto.encrypt(config_1.config.SUPERADMIN.SUPERADMIN_PASSWORD);
            const superAdmin = this.adminRepo.create({
                password: hashPassword,
                role: index_enum_1.Roles.SUPER_ADMIN,
                username: config_1.config.SUPERADMIN.SUPERADMIN_USERNAME,
                phoneNumber: config_1.config.SUPERADMIN.SUPER_ADMIN_PHONE_NUMBER,
            });
            await this.adminRepo.save(superAdmin);
        }
    }
    async createAdmin(dto) {
        const { phoneNumber, username, password } = dto;
        const existsUsername = await this.adminRepo.findOne({
            where: { username },
        });
        if (existsUsername)
            throw new common_1.ConflictException('Username already exists!');
        const existsPhoneNumber = await this.adminRepo.findOne({
            where: { phoneNumber },
        });
        if (existsPhoneNumber)
            throw new common_1.ConflictException('Phone number already exists');
        const hashPassword = await this.crypto.encrypt(password);
        const admin = this.adminRepo.create({
            password: hashPassword,
            phoneNumber,
            username,
        });
        await this.adminRepo.save(admin);
        return (0, success_response_1.successRes)(admin, 201);
    }
    async updateAdmin(dto, id) {
        const { username, phoneNumber, password } = dto;
        const admin = await this.adminRepo.findOne({ where: { id } });
        if (!admin)
            throw new common_1.NotFoundException('Admin not found');
        if (username) {
            const existsUsername = await this.adminRepo.findOne({
                where: { username },
            });
            if (existsUsername && existsUsername.id !== id)
                throw new common_1.ConflictException('Username already exists');
        }
        if (phoneNumber) {
            const existsPhoneNumber = await this.adminRepo.findOne({
                where: { phoneNumber },
            });
            if (existsPhoneNumber && existsPhoneNumber.id !== id)
                throw new common_1.ConflictException('Phone number already exists');
        }
        let hashPassword = '';
        if (password) {
            hashPassword = await this.crypto.encrypt(password);
            dto.password = hashPassword;
        }
        const updatetAdmin = await this.adminRepo.update(id, dto);
        return (0, success_response_1.successRes)(updatetAdmin);
    }
    async updateAdminMe(id, dto) {
        const { phoneNumber, username } = dto;
        const teacher = await this.adminRepo.findOne({ where: { id } });
        if (!teacher)
            throw new common_1.NotFoundException('Teacher not found');
        if (phoneNumber) {
            const existsPhoneNumber = await this.adminRepo.findOne({
                where: { phoneNumber },
            });
            if (existsPhoneNumber && existsPhoneNumber.id !== id)
                throw new common_1.ConflictException('Phone number aready exists');
        }
        if (username) {
            const existsUsername = await this.adminRepo.findOne({
                where: { phoneNumber },
            });
            if (existsUsername && existsUsername.id !== id)
                throw new common_1.ConflictException('Phone number aready exists');
        }
        const updatedTeacher = await this.adminRepo.update(id, dto);
        return (0, success_response_1.successRes)(updatedTeacher);
    }
    async changePassword(id, dto) {
        const { currentPassword, newPassword } = dto;
        const admin = await this.adminRepo.findOne({ where: { id } });
        if (!admin)
            throw new common_1.NotFoundException('Admin not found');
        const isMatchPassword = await this.crypto.decrypt(currentPassword, admin.password);
        if (!isMatchPassword)
            throw new common_1.BadRequestException('Current password incorrect');
        const hashedPassword = await this.crypto.encrypt(newPassword);
        admin.password = hashedPassword;
        await this.adminRepo.update(id, { password: hashedPassword });
        return (0, success_response_1.successRes)({ message: 'Password successfully changed!' });
    }
    async getStats() {
        const [totalStudents, totalTeachers, totalLessons] = await Promise.all([
            this.studentRepo.count(),
            this.teacherRepo.count({
                where: { isDelete: false, isActive: true },
            }),
            this.lessonRepo.count(),
        ]);
        const payments = await this.paymentRepo.find();
        const totalRevenue = payments.reduce((sum, p) => sum + (p.platformAmount || 0), 0);
        const datas = {
            totalStudents,
            totalTeachers,
            totalLessons,
            totalRevenue,
            charts: {
                lessonsByStatus: [],
            },
        };
        return (0, success_response_1.successRes)(datas);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(2, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(3, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __param(4, (0, typeorm_1.InjectRepository)(teacherPayment_entity_1.TeacherPayment)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, crypto_service_1.CryptoService])
], AdminService);
//# sourceMappingURL=admin.service.js.map