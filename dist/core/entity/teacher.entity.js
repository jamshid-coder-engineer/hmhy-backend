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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const index_enum_1 = require("../../common/enum/index.enum");
const lessonTemplate_entity_1 = require("./lessonTemplate.entity");
const teacherPayment_entity_1 = require("./teacherPayment.entity");
const lesson_entity_1 = require("./lesson.entity");
let Teacher = class Teacher extends base_entity_1.BaseEntity {
    email;
    phoneNumber;
    fullName;
    password;
    deletedBy;
    cardNumber;
    isActive;
    authProvider;
    isDelete;
    isComplete;
    role;
    specification;
    level;
    description;
    reasonDelete;
    hourPrice;
    portfolioLink;
    imageUrl;
    googleId;
    googleRefreshToken;
    googleAccessToken;
    rating;
    experience;
    lessons;
    lessonTemplates;
    payments;
    lessonHistory;
};
exports.Teacher = Teacher;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true, nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true, nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Teacher.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "deletedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true, nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "cardNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Teacher.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: index_enum_1.AuthProvider,
        default: index_enum_1.AuthProvider.LOCAL,
    }),
    __metadata("design:type", String)
], Teacher.prototype, "authProvider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Teacher.prototype, "isDelete", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Teacher.prototype, "isComplete", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: index_enum_1.Roles, default: index_enum_1.Roles.TEACHER }),
    __metadata("design:type", String)
], Teacher.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: index_enum_1.TeacherSpecification, nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "specification", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "reasonDelete", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Teacher.prototype, "hourPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "portfolioLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "googleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "googleRefreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "googleAccessToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 3, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Teacher.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "lessons", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lessonTemplate_entity_1.LessonTemplate, (template) => template.teacher, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Teacher.prototype, "lessonTemplates", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => teacherPayment_entity_1.TeacherPayment, (payment) => payment.teacher, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Teacher.prototype, "payments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_entity_1.Lesson, (lesson) => lesson.teacher, { cascade: true }),
    __metadata("design:type", Array)
], Teacher.prototype, "lessonHistory", void 0);
exports.Teacher = Teacher = __decorate([
    (0, typeorm_1.Entity)('teacher')
], Teacher);
//# sourceMappingURL=teacher.entity.js.map