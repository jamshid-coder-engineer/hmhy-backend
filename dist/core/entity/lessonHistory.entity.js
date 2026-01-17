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
exports.LessonHistory = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const index_enum_1 = require("../../common/enum/index.enum");
const student_entity_1 = require("./student.entity");
let LessonHistory = class LessonHistory extends base_entity_1.BaseEntity {
    lessonId;
    star;
    feedback;
    teacherId;
    studentId;
    student;
};
exports.LessonHistory = LessonHistory;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], LessonHistory.prototype, "lessonId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: index_enum_1.Rating }),
    __metadata("design:type", String)
], LessonHistory.prototype, "star", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], LessonHistory.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], LessonHistory.prototype, "teacherId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], LessonHistory.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.history),
    (0, typeorm_1.JoinColumn)({ name: 'studentId' }),
    __metadata("design:type", student_entity_1.Student)
], LessonHistory.prototype, "student", void 0);
exports.LessonHistory = LessonHistory = __decorate([
    (0, typeorm_1.Entity)('lessonHistory')
], LessonHistory);
//# sourceMappingURL=lessonHistory.entity.js.map