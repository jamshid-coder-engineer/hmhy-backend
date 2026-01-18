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
exports.LessonController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lesson_service_1 = require("./lesson.service");
const create_lesson_dto_1 = require("./dto/create-lesson.dto");
const update_lesson_dto_1 = require("./dto/update-lesson.dto");
const current_user_decorator_1 = require("../../common/decorator/current-user.decorator");
const role_guard_1 = require("../../common/guard/role.guard");
const auth_guard_1 = require("../../common/guard/auth.guard");
const roles_decorator_1 = require("../../common/decorator/roles.decorator");
const index_enum_1 = require("../../common/enum/index.enum");
const lesson_complete_dto_1 = require("./dto/lesson-complete.dto");
const lesson_filter_dto_1 = require("./dto/lesson-filter.dto");
let LessonController = class LessonController {
    lessonService;
    constructor(lessonService) {
        this.lessonService = lessonService;
    }
    findAll() {
        return this.lessonService.findAll({});
    }
    findAllForTeacher(user, date) {
        console.log("DATE_FROM_QUERY:", date);
        return this.lessonService.getTeacherLessonsByDate(user.id, date);
    }
    create(createLessonDto, user) {
        return this.lessonService.createLesson(createLessonDto, user.id);
    }
    lessonComplete(teacher, dto, lessonId) {
        return this.lessonService.lessonComplete(teacher.id, dto, lessonId);
    }
    getAvailableLessons() {
        return this.lessonService.getAvailableLessons();
    }
    lessonStats(user) {
        return this.lessonService.lessonStats(user.id);
    }
    async getTeacherLessonsAdmin(teacherId, query) {
        return this.lessonService.getTeacherLessonsForAdmin(teacherId, query);
    }
    getMyLessons(user) {
        return this.lessonService.getMyLessons(user.id);
    }
    bookLesson(id, user) {
        console.log(user);
        return this.lessonService.bookLesson(id, user.id);
    }
    update(id, updateLessonDto) {
        return this.lessonService.updateLesson(id, updateLessonDto);
    }
    delete(id) {
        return this.lessonService.deleteLesson(id);
    }
};
exports.LessonController = LessonController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Bo'sh darslar ro'yxati",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('for-teacher'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.TEACHER),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Bo'sh darslar ro'yxati",
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "findAllForTeacher", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.TEACHER),
    (0, swagger_1.ApiOperation)({
        summary: 'Yangi dars yaratish (Teacher)',
        description: "Teacher bo'sh dars slotini yaratadi. Google Meet link avtomatik generatsiya qilinadi. Student keyinchalik bu darsni booking qiladi.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Dars muvaffaqiyatli yaratildi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Noto`g`ri ma`lumotlar yoki Google Calendar ulanmagan',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lesson_dto_1.CreateLessonDto, Object]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('lesson-complete/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.TEACHER),
    (0, swagger_1.ApiOperation)({
        summary: 'Complete a lesson',
        description: 'Marks a lesson as complete and moves it to lesson history',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'Lesson ID',
        example: '56efa278-5d5d-40e5-b15b-649f0cc7408c',
    }),
    (0, swagger_1.ApiBody)({
        type: lesson_complete_dto_1.LessonComplete,
        description: 'Lesson completion data',
        examples: {
            example1: {
                summary: 'Complete with feedback',
                value: {
                    status: 'COMPLETED',
                    star: 'FIVE',
                    feedback: 'Great lesson, student showed excellent progress',
                },
            },
            example2: {
                summary: 'Complete without feedback',
                value: {
                    status: 'COMPLETED',
                    star: 'FOUR',
                },
            },
        },
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, lesson_complete_dto_1.LessonComplete, String]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "lessonComplete", null);
__decorate([
    (0, common_1.Get)('available'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.STUDENT, index_enum_1.Roles.TEACHER),
    (0, swagger_1.ApiOperation)({
        summary: "Barcha bo'sh darslarni ko'rish",
        description: "Studentlar uchun booking qilish mumkin bo'lgan barcha darslar ro'yxati",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Bo'sh darslar ro'yxati",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "getAvailableLessons", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.TEACHER),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "lessonStats", null);
__decorate([
    (0, common_1.Get)(':id/lessons'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN, index_enum_1.Roles.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, lesson_filter_dto_1.LessonFiltersDto]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "getTeacherLessonsAdmin", null);
__decorate([
    (0, common_1.Get)('my-lessons'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.TEACHER),
    (0, swagger_1.ApiOperation)({
        summary: 'Mening darslarim (Student)',
        description: "Student o'zi booking qilgan barcha darslarni ko'radi",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Student darslar ro'yxati",
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "getMyLessons", null);
__decorate([
    (0, common_1.Post)(':id/book'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.STUDENT),
    (0, swagger_1.ApiOperation)({
        summary: 'Darsni booking qilish (Student)',
        description: "Student bo'sh darsni o'ziga booking qiladi",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dars muvaffaqiyatli booking qilindi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dars allaqachon booking qilingan yoki mavjud emas',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Dars topilmadi',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "bookLesson", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Darsni yangilash',
        description: "Dars ma'lumotlarini yangilash (vaqt, narx va h.k.)",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dars muvaffaqiyatli yangilandi',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lesson_dto_1.UpdateLessonDto]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: "Darsni o'chirish",
        description: "Darsni database va Google Calendar'dan o'chirish",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Dars muvaffaqiyatli o'chirildi",
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "delete", null);
exports.LessonController = LessonController = __decorate([
    (0, swagger_1.ApiTags)('Lessons'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('lessons'),
    __metadata("design:paramtypes", [lesson_service_1.LessonService])
], LessonController);
//# sourceMappingURL=lesson.controller.js.map