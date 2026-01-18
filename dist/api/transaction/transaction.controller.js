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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("./transaction.service");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
const update_transaction_dto_1 = require("./dto/update-transaction.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../common/guard/auth.guard");
const role_guard_1 = require("../../common/guard/role.guard");
const roles_decorator_1 = require("../../common/decorator/roles.decorator");
const index_enum_1 = require("../../common/enum/index.enum");
let TransactionController = class TransactionController {
    transactionService;
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    create(createTransactionDto) {
        return this.transactionService.create(createTransactionDto);
    }
    findAll() {
        return this.transactionService.findAll();
    }
    getStats() {
        return this.transactionService.getStats();
    }
    findOne(id) {
        return this.transactionService.findOne(id);
    }
    update(id, updateTransactionDto) {
        return this.transactionService.update(id, updateTransactionDto);
    }
    remove(id) {
        return this.transactionService.remove(id);
    }
};
exports.TransactionController = TransactionController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.ADMIN, index_enum_1.Roles.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create transaction' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.ADMIN, index_enum_1.Roles.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all transactions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.ADMIN, index_enum_1.Roles.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get payment statistics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.ADMIN, index_enum_1.Roles.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get one transaction' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.ADMIN, index_enum_1.Roles.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update transaction' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_transaction_dto_1.UpdateTransactionDto]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.AccessRoles)(index_enum_1.Roles.ADMIN, index_enum_1.Roles.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete transaction' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "remove", null);
exports.TransactionController = TransactionController = __decorate([
    (0, swagger_1.ApiTags)('Transactions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, common_1.Controller)('transaction'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
//# sourceMappingURL=transaction.controller.js.map