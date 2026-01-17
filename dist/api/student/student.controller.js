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
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("./student.service");
const update_student_dto_1 = require("./dto/update-student.dto");
const auth_guard_1 = require("../../common/guard/auth.guard");
const role_guard_1 = require("../../common/guard/role.guard");
const roles_decorator_1 = require("../../common/decorator/roles.decorator");
const index_enum_1 = require("../../common/enum/index.enum");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../common/decorator/current-user.decorator");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let StudentController = class StudentController {
    studentService;
    constructor(studentService) {
        this.studentService = studentService;
    }
    findAll(query) {
        return this.studentService.findAllWithPagination({
            limit: query.limit,
            page: query.page,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                tgUsername: true,
                tgId: true,
                blockedReason: true,
                createdAt: true,
                updatedAt: true,
                isBlocked: true,
                email: true,
                lessons: {
                    id: true,
                    name: true,
                    teacher: { fullName: true },
                    startTime: true,
                },
            },
        });
    }
    getMe(user) {
        return this.studentService.findOneById(user.id, {
            select: {
                id: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                tgUsername: true,
                tgId: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                isBlocked: true,
                lessons: {
                    id: true,
                    name: true,
                    teacher: { fullName: true },
                    startTime: true,
                },
            },
        });
    }
    async update(id, updateStudentDto) {
        return await this.studentService.update(id, updateStudentDto);
    }
    async getStudentStats() {
        return await this.studentService.getStats();
    }
    async blockStudent(id, reason) {
        return await this.studentService.toggleStudentBlock(id);
    }
    findOne(id) {
        return this.studentService.findOneById(id, {
            select: {
                id: true,
                firstName: true,
                email: true,
                lastName: true,
                phoneNumber: true,
                isBlocked: true,
                tgId: true,
                createdAt: true,
                updatedAt: true,
                tgUsername: true,
                blockedReason: true,
                lessons: {
                    id: true,
                    name: true,
                    teacher: { fullName: true },
                    startTime: true,
                },
            },
        });
    }
    remove(id) {
        return this.studentService.delete(id);
    }
};
exports.StudentController = StudentController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN, index_enum_1.Roles.ADMIN),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.TEACHER, index_enum_1.Roles.STUDENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "getMe", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_dto_1.UpdateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getStudentStats", null);
__decorate([
    (0, common_1.Post)('/:id/toggle-block'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "blockStudent", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "remove", null);
exports.StudentController = StudentController = __decorate([
    (0, common_1.Controller)('student'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
//# sourceMappingURL=student.controller.js.map