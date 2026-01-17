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
exports.LessonHistoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lesson_history_service_1 = require("./lesson-history.service");
const auth_guard_1 = require("../../common/guard/auth.guard");
const role_guard_1 = require("../../common/guard/role.guard");
const roles_decorator_1 = require("../../common/decorator/roles.decorator");
const index_enum_1 = require("../../common/enum/index.enum");
let LessonHistoryController = class LessonHistoryController {
    lessonHistoryService;
    constructor(lessonHistoryService) {
        this.lessonHistoryService = lessonHistoryService;
    }
    findAll() {
        return this.lessonHistoryService.findAll();
    }
    findOne(id) {
        return this.lessonHistoryService.findOneById(id);
    }
    remove(id) {
        return this.lessonHistoryService.delete(id);
    }
};
exports.LessonHistoryController = LessonHistoryController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Barcha dars tarixlarini olish' }),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.ADMIN, index_enum_1.Roles.SUPER_ADMIN, 'ID'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LessonHistoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Bitta dars tarixini olish' }),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.ADMIN, index_enum_1.Roles.SUPER_ADMIN, 'ID'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonHistoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "Dars tarixini o'chirish" }),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.ADMIN, index_enum_1.Roles.SUPER_ADMIN, 'ID'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonHistoryController.prototype, "remove", null);
exports.LessonHistoryController = LessonHistoryController = __decorate([
    (0, swagger_1.ApiTags)('Lesson History'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, common_1.Controller)('lesson-history'),
    __metadata("design:paramtypes", [lesson_history_service_1.LessonHistoryService])
], LessonHistoryController);
//# sourceMappingURL=lesson-history.controller.js.map