"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lesson_history_service_1 = require("./lesson-history.service");
const lesson_history_controller_1 = require("./lesson-history.controller");
const lessonHistory_entity_1 = require("../../core/entity/lessonHistory.entity");
const lesson_entity_1 = require("../../core/entity/lesson.entity");
const student_entity_1 = require("../../core/entity/student.entity");
let LessonHistoryModule = class LessonHistoryModule {
};
exports.LessonHistoryModule = LessonHistoryModule;
exports.LessonHistoryModule = LessonHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([lessonHistory_entity_1.LessonHistory, lesson_entity_1.Lesson, student_entity_1.Student])
        ],
        controllers: [lesson_history_controller_1.LessonHistoryController],
        providers: [lesson_history_service_1.LessonHistoryService],
        exports: [lesson_history_service_1.LessonHistoryService]
    })
], LessonHistoryModule);
//# sourceMappingURL=lesson-history.module.js.map