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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const update_admin_dto_1 = require("./dto/update-admin.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../common/guard/auth.guard");
const role_guard_1 = require("../../common/guard/role.guard");
const index_enum_1 = require("../../common/enum/index.enum");
const roles_decorator_1 = require("../../common/decorator/roles.decorator");
const current_user_decorator_1 = require("../../common/decorator/current-user.decorator");
const typeorm_1 = require("typeorm");
const change_password_dto_1 = require("../teacher/dto/change-password.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    create(createAdminDto) {
        return this.adminService.createAdmin(createAdminDto);
    }
    findAll(query) {
        return this.adminService.findAllWithPagination({
            page: query.page,
            limit: query.limit,
            select: {
                id: true,
                phoneNumber: true,
                username: true,
                role: true,
            },
            relations: [],
        });
    }
    updateMe(user, dto) {
        return this.adminService.updateAdminMe(user.id, dto);
    }
    changePassword(user, dto) {
        return this.adminService.changePassword(user.id, dto);
    }
    getMe(user) {
        return this.adminService.findOneById(user.id, {
            select: {
                id: true,
                phoneNumber: true,
                username: true,
                role: true,
            },
            relations: [],
        });
    }
    getStats() {
        return this.adminService.getStats();
    }
    findOne(id) {
        return this.adminService.findOneById(id, {
            select: {
                id: true,
                phoneNumber: true,
                username: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
            relations: [],
        });
    }
    update(id, updateAdminDto) {
        return this.adminService.updateAdmin(updateAdminDto, id);
    }
    async remove(id) {
        const data = await this.adminService.findOneById(id, {
            where: { role: (0, typeorm_1.Not)(index_enum_1.Roles.SUPER_ADMIN) },
            relations: [],
        });
        if (data)
            return this.adminService.delete(id);
        throw new common_1.NotFoundException('Admin not found');
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new admin' }),
    (0, swagger_1.ApiBody)({ type: create_admin_dto_1.CreateAdminDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Admin created successfully',
        schema: {
            example: {
                status: 'success',
                data: {
                    id: '1',
                    username: 'suhrob',
                    phoneNumber: '+998901234567',
                    role: 'ADMIN',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request',
        schema: { example: { status: 'error', message: 'Validation failed' } },
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all admins' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of admins',
        schema: {
            example: {
                status: 'success',
                data: [
                    {
                        id: '1',
                        username: 'suhrob',
                        phoneNumber: '+998901234567',
                        role: 'ADMIN',
                    },
                ],
            },
        },
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN, index_enum_1.Roles.ADMIN),
    (0, common_1.Patch)('update'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_admin_dto_1.UpdateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateMe", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN, index_enum_1.Roles.ADMIN),
    (0, common_1.Patch)('changePassword'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN, index_enum_1.Roles.ADMIN),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getMe", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN, index_enum_1.Roles.ADMIN),
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getStats", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get admin by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Admin found',
        schema: {
            example: {
                status: 'success',
                data: {
                    id: '1',
                    username: 'suhrob',
                    phoneNumber: '+998901234567',
                    role: 'ADMIN',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Admin not found',
        schema: { example: { status: 'error', message: 'Admin not found' } },
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN, 'ID'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update admin by ID' }),
    (0, swagger_1.ApiBody)({ type: update_admin_dto_1.UpdateAdminDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Admin updated successfully',
        schema: {
            example: {
                status: 'success',
                data: {
                    id: '1',
                    username: 'suhrob_updated',
                    phoneNumber: '+998901234567',
                    role: 'ADMIN',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request',
        schema: { example: { status: 'error', message: 'Validation failed' } },
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN, 'ID'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_admin_dto_1.UpdateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete admin by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Admin deleted successfully',
        schema: {
            example: { status: 'success', message: 'Admin deleted' },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Admin not found',
        schema: { example: { status: 'error', message: 'Admin not found' } },
    }),
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "remove", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin'),
    (0, common_1.Controller)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map