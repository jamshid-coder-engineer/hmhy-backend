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
exports.Lesson = void 0;
const typeorm_1 = require("typeorm");
const teacher_entity_1 = require("./teacher.entity");
const student_entity_1 = require("./student.entity");
const index_enum_1 = require("../../common/enum/index.enum");
const base_entity_1 = require("./base.entity");
const notification_entity_1 = require("./notification.entity");
let Lesson = class Lesson extends base_entity_1.BaseEntity {
    name;
    startTime;
    endTime;
    teacherId;
    studentId;
    teacher;
    student;
    googleMeetUrl;
    status;
    googleEventId;
    price;
    isPaid;
    teacherPayment;
    bookedAt;
    remainedSendAt;
    completedAt;
    notification;
    transaction;
    notifications;
};
exports.Lesson = Lesson;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Lesson.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Lesson.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Lesson.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Lesson.prototype, "teacherId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teacher_entity_1.Teacher, (teacher) => teacher.lessonHistory, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'teacherId' }),
    __metadata("design:type", teacher_entity_1.Teacher)
], Lesson.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.lessons),
    (0, typeorm_1.JoinColumn)({ name: 'studentId' }),
    __metadata("design:type", student_entity_1.Student)
], Lesson.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "googleMeetUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: index_enum_1.LessonStatus, default: index_enum_1.LessonStatus.AVAILABLE }),
    __metadata("design:type", String)
], Lesson.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "googleEventId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Lesson.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Lesson.prototype, "isPaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "teacherPayment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Lesson.prototype, "bookedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Lesson.prototype, "remainedSendAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Lesson.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "notification", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "transaction", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, (notification) => notification.lesson),
    __metadata("design:type", Array)
], Lesson.prototype, "notifications", void 0);
exports.Lesson = Lesson = __decorate([
    (0, typeorm_1.Entity)('lesson')
], Lesson);
//# sourceMappingURL=lesson.entity.js.map