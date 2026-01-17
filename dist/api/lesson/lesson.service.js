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
exports.LessonService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../infrastructure/base/base-service");
const lesson_entity_1 = require("../../core/entity/lesson.entity");
const typeorm_1 = require("@nestjs/typeorm");
const google_calendar_service_1 = require("./google-calendar.service");
const teacher_entity_1 = require("../../core/entity/teacher.entity");
const student_entity_1 = require("../../core/entity/student.entity");
const index_enum_1 = require("../../common/enum/index.enum");
const success_response_1 = require("../../infrastructure/response/success.response");
const lessonHistory_entity_1 = require("../../core/entity/lessonHistory.entity");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
let LessonService = class LessonService extends base_service_1.BaseService {
    lessonRepo;
    teacherRepo;
    studentRepo;
    calendarService;
    lessonHistoryRepo;
    constructor(lessonRepo, teacherRepo, studentRepo, calendarService, lessonHistoryRepo) {
        super(lessonRepo);
        this.lessonRepo = lessonRepo;
        this.teacherRepo = teacherRepo;
        this.studentRepo = studentRepo;
        this.calendarService = calendarService;
        this.lessonHistoryRepo = lessonHistoryRepo;
    }
    async createLesson(dto, teacherId) {
        const startTime = dayjs_1.default
            .tz(dto.startTime.replace('Z', ''), 'Asia/Tashkent')
            .toDate();
        const endTime = dayjs_1.default
            .tz(dto.endTime.replace('Z', ''), 'Asia/Tashkent')
            .toDate();
        const now = new Date();
        if (startTime >= endTime) {
            throw new common_1.BadRequestException("Tugash vaqti boshlanish vaqtidan keyin bo'lishi kerak");
        }
        if (startTime < now) {
            throw new common_1.BadRequestException("O'tmishdagi vaqtga dars belgilab bo'lmaydi");
        }
        const teacher = await this.teacherRepo.findOne({
            where: { id: teacherId },
        });
        if (!teacher)
            throw new common_1.NotFoundException(`O'qituvchi topilmadi`);
        console.log(teacher);
        if (!teacher.googleAccessToken) {
            throw new common_1.BadRequestException("Google Calendar ulangan bo'lishi shart");
        }
        console.log("access?", !!teacher.googleAccessToken);
        console.log("refresh?", !!teacher.googleRefreshToken);
        console.log("access sample:", teacher.googleAccessToken?.slice(0, 15));
        const conflictingLesson = await this.lessonRepo.findOne({
            where: {
                teacherId: teacherId,
                startTime: startTime,
            },
        });
        if (conflictingLesson) {
            throw new common_1.BadRequestException('Bu vaqtda sizda boshqa dars mavjud');
        }
        try {
            const calendar = await this.calendarService.getClient(teacher);
            await this.teacherRepo.save(teacher);
            const event = await calendar.events.insert({
                calendarId: 'primary',
                conferenceDataVersion: 1,
                requestBody: {
                    summary: `Dars: ${dto.name}`,
                    description: 'Dars uchun Google Meet havolasi',
                    start: { dateTime: startTime.toISOString(), timeZone: 'Asia/Tashkent' },
                    end: { dateTime: endTime.toISOString(), timeZone: 'Asia/Tashkent' },
                    conferenceData: {
                        createRequest: {
                            requestId: `lesson-${Date.now()}`,
                            conferenceSolutionKey: { type: 'hangoutsMeet' },
                        },
                    },
                },
            });
            const lesson = this.lessonRepo.create({
                name: dto.name,
                startTime: startTime,
                endTime: endTime,
                price: dto.price,
                status: dto.status ?? index_enum_1.LessonStatus.AVAILABLE,
                isPaid: dto.isPaid ?? false,
                teacherId: teacherId,
                googleMeetUrl: event.data.hangoutLink ?? undefined,
                googleEventId: event.data.id ?? undefined,
            });
            const newLess = await this.lessonRepo.save(lesson);
            return (0, success_response_1.successRes)({
                message: 'Dars muvaffaqiyatli yaratildi',
                data: newLess,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Xatolik: ${error.message}`);
        }
    }
    async getTeacherLessonsByDate(teacherId, date) {
        const qb = this.lessonRepo
            .createQueryBuilder('lesson')
            .where('lesson.teacherId = :teacherId', { teacherId });
        if (date) {
            const startOfDay = dayjs_1.default
                .tz(date, 'Asia/Tashkent')
                .startOf('day')
                .toDate();
            const endOfDay = dayjs_1.default
                .tz(date, 'Asia/Tashkent')
                .endOf('day')
                .toDate();
            qb.andWhere('lesson.startTime BETWEEN :start AND :end', { start: startOfDay, end: endOfDay });
        }
        qb.orderBy('lesson.startTime', 'DESC');
        const lessons = await qb.getMany();
        return {
            statusCode: 200,
            data: lessons,
        };
    }
    async lessonComplete(teacherId, dto, lessonId) {
        const lesson = await this.lessonRepo.findOne({
            where: { id: lessonId },
        });
        if (!lesson) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        if (lesson.teacherId !== teacherId) {
            throw new common_1.ForbiddenException('You can only complete your own lessons');
        }
        if (lesson.status === index_enum_1.LessonStatus.COMPLETED) {
            throw new common_1.BadRequestException('Lesson is already completed');
        }
        return await this.lessonRepo.manager.transaction(async (manager) => {
            const lessonHistory = await manager.save(lessonHistory_entity_1.LessonHistory, {
                lessonId: lessonId,
                star: dto.star || index_enum_1.Rating.FIVE,
                feedback: dto.feedback || 'feedback mavjud emas',
                teacherId: lesson.teacherId,
                studentId: lesson.studentId,
            });
            await manager.delete(lesson_entity_1.Lesson, lessonId);
            return (0, success_response_1.successRes)({
                message: 'Lesson completed and moved to history',
                lessonHistory,
            });
        });
    }
    async getTeacherLessonsForAdmin(teacherId, filters) {
        const { search, sortBy, sortOrder, status, page = '1', limit = '10' } = filters;
        const teacher = await this.teacherRepo.findOne({ where: { id: teacherId } });
        if (!teacher) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const qb = this.lessonRepo
            .createQueryBuilder('lesson')
            .leftJoinAndSelect('lesson.student', 'student')
            .where('lesson.teacherId = :teacherId', { teacherId });
        if (search) {
            qb.andWhere('lesson.name ILIKE :search', { search: `%${search}%` });
        }
        if (status) {
            qb.andWhere('lesson.status = :status', { status });
        }
        if (sortBy) {
            qb.orderBy(`lesson.${sortBy}`, sortOrder || 'DESC');
        }
        else {
            qb.orderBy('lesson.createdAt', 'DESC');
        }
        const total = await qb.getCount();
        const lessons = await qb
            .skip((pageNumber - 1) * limitNumber)
            .take(limitNumber)
            .getMany();
        return {
            statusCode: 200,
            message: {
                uz: 'Teacher darslari',
                en: 'Teacher lessons',
                ru: 'Уроки преподавателя',
            },
            data: lessons,
            currentPage: pageNumber,
            totalPages: Math.ceil(total / limitNumber),
            totalElements: total,
            pageSize: limitNumber,
            from: (pageNumber - 1) * limitNumber + 1,
            to: Math.min(pageNumber * limitNumber, total),
        };
    }
    async lessonStats(id) {
        const teacher = await this.teacherRepo.findOne({ where: { id } });
        if (!teacher)
            throw new common_1.NotFoundException('Teacher not found');
        const totalLessons = await this.lessonRepo.count({
            where: { teacherId: id },
        });
        const bookedLessons = await this.lessonRepo.count({
            where: { teacherId: id, status: index_enum_1.LessonStatus.BOOKED },
        });
        const totalPages = Math.ceil(totalLessons / 10) || 0;
        return {
            totalLessons,
            bookedLessons,
            totalPages,
            currentPage: 1,
        };
    }
    async bookLesson(lessonId, studentId) {
        const lesson = await this.lessonRepo.findOne({
            where: { id: lessonId },
            relations: ['teacher'],
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson with ID ${lessonId} not found`);
        }
        if (lesson.status !== index_enum_1.LessonStatus.AVAILABLE) {
            throw new common_1.BadRequestException('Lesson is not available for booking');
        }
        if (lesson.studentId) {
            throw new common_1.BadRequestException('Lesson is already booked');
        }
        const student = await this.studentRepo.findOne({
            where: { id: studentId },
        });
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${studentId} not found`);
        }
        const conflictingLesson = await this.lessonRepo.findOne({
            where: {
                studentId: studentId,
                startTime: lesson.startTime,
            },
        });
        if (conflictingLesson) {
            throw new common_1.BadRequestException('You already have a lesson at this time');
        }
        try {
            if (lesson.googleEventId && lesson.teacher) {
                const calendar = await this.calendarService.getClient(lesson.teacher);
                await calendar.events.patch({
                    calendarId: 'primary',
                    eventId: lesson.googleEventId,
                    requestBody: {
                        description: `Lesson booked by: ${student.firstName || ''} ${student.lastName || ''}`,
                    },
                });
            }
            lesson.studentId = studentId;
            lesson.student = student;
            lesson.status = index_enum_1.LessonStatus.BOOKED;
            lesson.bookedAt = new Date();
            return await this.lessonRepo.save(lesson);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to book lesson: ${error.message}`);
        }
    }
    async updateLesson(id, dto) {
        const lesson = await this.lessonRepo.findOne({
            where: { id },
            relations: ['teacher', 'student'],
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`Dars topilmadi (ID: ${id})`);
        }
        if (dto.startTime || dto.endTime) {
            const startTime = dto.startTime
                ? dayjs_1.default.tz(dto.startTime.replace('Z', ''), 'Asia/Tashkent').toDate()
                : lesson.startTime;
            const endTime = dto.endTime
                ? dayjs_1.default.tz(dto.endTime.replace('Z', ''), 'Asia/Tashkent').toDate()
                : lesson.endTime;
            if (startTime >= endTime) {
                throw new common_1.BadRequestException('Tugash vaqti boshlanish vaqtidan keyin bolishi kerak');
            }
            if (lesson.googleEventId && lesson.teacher) {
                try {
                    const calendar = await this.calendarService.getClient(lesson.teacher);
                    await calendar.events.patch({
                        calendarId: 'primary',
                        eventId: lesson.googleEventId,
                        requestBody: {
                            start: {
                                dateTime: startTime.toISOString(),
                                timeZone: 'Asia/Tashkent',
                            },
                            end: {
                                dateTime: endTime.toISOString(),
                                timeZone: 'Asia/Tashkent',
                            },
                        },
                    });
                }
                catch (error) {
                    throw new common_1.BadRequestException(`Google Calendar yangilashda xatolik: ${error.message}`);
                }
            }
            lesson.startTime = startTime;
            lesson.endTime = endTime;
        }
        if (dto.name)
            lesson.name = dto.name;
        if (dto.status)
            lesson.status = dto.status;
        if (dto.price !== undefined)
            lesson.price = dto.price;
        if (dto.isPaid !== undefined)
            lesson.isPaid = dto.isPaid;
        return await this.lessonRepo.save(lesson);
    }
    async deleteLesson(id) {
        const lesson = await this.lessonRepo.findOne({
            where: { id },
            relations: ['teacher'],
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson with ID ${id} not found`);
        }
        if (lesson.googleEventId && lesson.teacher) {
            try {
                const calendar = await this.calendarService.getClient(lesson.teacher);
                await calendar.events.delete({
                    calendarId: 'primary',
                    eventId: lesson.googleEventId,
                });
            }
            catch (error) {
                console.error('Failed to delete Google Calendar event:', error.message);
            }
        }
        await this.lessonRepo.remove(lesson);
    }
    async getAvailableLessons() {
        return await this.lessonRepo.find({
            where: {
                status: index_enum_1.LessonStatus.AVAILABLE,
            },
            relations: ['teacher'],
            order: { startTime: 'ASC' },
        });
    }
    async getMyLessons(studentId) {
        return await this.lessonRepo.find({
            where: { studentId },
            relations: ['teacher'],
            order: { startTime: 'ASC' },
        });
    }
    async getTeacherLessons(teacherId) {
        return await this.lessonRepo.find({
            where: { teacherId },
            relations: ['student'],
            order: { startTime: 'ASC' },
        });
    }
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(1, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __param(2, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(4, (0, typeorm_1.InjectRepository)(lessonHistory_entity_1.LessonHistory)),
    __metadata("design:paramtypes", [Object, Object, Object, google_calendar_service_1.GoogleCalendarService, Object])
], LessonService);
//# sourceMappingURL=lesson.service.js.map