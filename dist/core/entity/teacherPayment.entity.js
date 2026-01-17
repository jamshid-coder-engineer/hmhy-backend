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
exports.TeacherPayment = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const teacher_entity_1 = require("./teacher.entity");
let TeacherPayment = class TeacherPayment extends base_entity_1.BaseEntity {
    teacher;
    teacherRelation;
    lessons;
    totalLessonAmount;
    platformComission;
    platformAmount;
    teacherAmount;
    paidBy;
    paidAt;
    isCanceled;
    canceledAt;
    canceledBy;
    canceledReason;
    notes;
};
exports.TeacherPayment = TeacherPayment;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], TeacherPayment.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teacher_entity_1.Teacher, (teacher) => teacher.payments),
    (0, typeorm_1.JoinColumn)({ name: 'teacher' }),
    __metadata("design:type", teacher_entity_1.Teacher)
], TeacherPayment.prototype, "teacherRelation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', array: true }),
    __metadata("design:type", Array)
], TeacherPayment.prototype, "lessons", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TeacherPayment.prototype, "totalLessonAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TeacherPayment.prototype, "platformComission", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TeacherPayment.prototype, "platformAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TeacherPayment.prototype, "teacherAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], TeacherPayment.prototype, "paidBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], TeacherPayment.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], TeacherPayment.prototype, "isCanceled", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], TeacherPayment.prototype, "canceledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], TeacherPayment.prototype, "canceledBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], TeacherPayment.prototype, "canceledReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], TeacherPayment.prototype, "notes", void 0);
exports.TeacherPayment = TeacherPayment = __decorate([
    (0, typeorm_1.Entity)('teacherPayment')
], TeacherPayment);
//# sourceMappingURL=teacherPayment.entity.js.map