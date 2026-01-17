"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonModule = void 0;
const common_1 = require("@nestjs/common");
const lesson_service_1 = require("./lesson.service");
const lesson_controller_1 = require("./lesson.controller");
const typeorm_1 = require("@nestjs/typeorm");
const lesson_entity_1 = require("../../core/entity/lesson.entity");
const teacher_entity_1 = require("../../core/entity/teacher.entity");
const student_entity_1 = require("../../core/entity/student.entity");
const google_calendar_module_1 = require("./google-calendar.module");
const lessonHistory_entity_1 = require("../../core/entity/lessonHistory.entity");
let LessonModule = class LessonModule {
};
exports.LessonModule = LessonModule;
exports.LessonModule = LessonModule = __decorate([
    (0, common_1.Module)({
        imports: [google_calendar_module_1.GoogleCalendarModule, typeorm_1.TypeOrmModule.forFeature([lesson_entity_1.Lesson, teacher_entity_1.Teacher, student_entity_1.Student, lessonHistory_entity_1.LessonHistory])],
        controllers: [lesson_controller_1.LessonController,],
        providers: [lesson_service_1.LessonService],
    })
], LessonModule);
//# sourceMappingURL=lesson.module.js.map