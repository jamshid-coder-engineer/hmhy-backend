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
exports.LessonHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const base_service_1 = require("../../infrastructure/base/base-service");
const success_response_1 = require("../../infrastructure/response/success.response");
const lessonHistory_entity_1 = require("../../core/entity/lessonHistory.entity");
let LessonHistoryService = class LessonHistoryService extends base_service_1.BaseService {
    lessonHistoryRepository;
    constructor(lessonHistoryRepository) {
        super(lessonHistoryRepository);
        this.lessonHistoryRepository = lessonHistoryRepository;
    }
    async getStudentHistory(studentId) {
        const histories = await this.lessonHistoryRepository.find({
            where: { studentId },
            relations: ['lesson', 'lesson.teacher'],
            order: { createdAt: 'DESC' },
        });
        return (0, success_response_1.successRes)(histories);
    }
    async getLessonHistory(lessonId) {
        const histories = await this.lessonHistoryRepository.find({
            where: { lessonId },
            relations: ['student'],
            order: { createdAt: 'DESC' },
        });
        return (0, success_response_1.successRes)(histories);
    }
    async getHistoryByDateRange(studentId, startDate, endDate) {
        const histories = await this.lessonHistoryRepository
            .createQueryBuilder('history')
            .leftJoinAndSelect('history.lesson', 'lesson')
            .leftJoinAndSelect('lesson.teacher', 'teacher')
            .where('history.studentId = :studentId', { studentId })
            .andWhere('lesson.startTime BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
        })
            .orderBy('lesson.startTime', 'DESC')
            .getMany();
        return (0, success_response_1.successRes)(histories);
    }
};
exports.LessonHistoryService = LessonHistoryService;
exports.LessonHistoryService = LessonHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lessonHistory_entity_1.LessonHistory)),
    __metadata("design:paramtypes", [Object])
], LessonHistoryService);
//# sourceMappingURL=lesson-history.service.js.map