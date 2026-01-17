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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("../../core/entity/transaction.entity");
const index_enum_1 = require("../../common/enum/index.enum");
const success_response_1 = require("../../infrastructure/response/success.response");
let TransactionService = class TransactionService {
    transactionRepo;
    constructor(transactionRepo) {
        this.transactionRepo = transactionRepo;
    }
    async create(createTransactionDto) {
        const transaction = this.transactionRepo.create(createTransactionDto);
        const saved = await this.transactionRepo.save(transaction);
        return (0, success_response_1.successRes)(saved, 201);
    }
    async findAll() {
        const transactions = await this.transactionRepo.find({
            relations: ['studentRelation'],
            order: { createdAt: 'DESC' },
        });
        return (0, success_response_1.successRes)(transactions);
    }
    async getStats() {
        const transactions = await this.transactionRepo.find({
            relations: ['studentRelation'],
        });
        const totalRevenue = transactions
            .filter(t => t.status === index_enum_1.TransactionStatus.PAID)
            .reduce((sum, t) => sum + Number(t.price), 0);
        const pending = transactions.filter(t => t.status === index_enum_1.TransactionStatus.PENDING);
        const completed = transactions.filter(t => t.status === index_enum_1.TransactionStatus.PAID);
        const canceled = transactions.filter(t => t.status === index_enum_1.TransactionStatus.PENDING_CANCELED);
        const successRate = transactions.length > 0
            ? ((completed.length / transactions.length) * 100).toFixed(1)
            : '0';
        return (0, success_response_1.successRes)({
            totalRevenue,
            pendingPayments: pending.length,
            pendingAmount: pending.reduce((sum, t) => sum + Number(t.price), 0),
            successRate: Number(successRate),
            completedCount: completed.length,
            canceledCount: canceled.length,
            canceledAmount: canceled.reduce((sum, t) => sum + Number(t.price), 0),
            totalTransactions: transactions.length,
            transactions: transactions.map(t => ({
                id: t.id,
                date: t.createdAt,
                student: t.studentRelation ? {
                    id: t.studentRelation.id,
                    name: `${t.studentRelation.firstName} ${t.studentRelation.lastName}`,
                } : null,
                teacher: null,
                amount: t.price,
                status: t.status,
                provider: 'Click',
            })),
        });
    }
    async findOne(id) {
        const transaction = await this.transactionRepo.findOne({
            where: { id },
            relations: ['studentRelation'],
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        return (0, success_response_1.successRes)(transaction);
    }
    async update(id, updateTransactionDto) {
        const transaction = await this.transactionRepo.findOne({ where: { id } });
        if (!transaction) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        Object.assign(transaction, updateTransactionDto);
        if (updateTransactionDto.status === index_enum_1.TransactionStatus.PAID) {
            transaction.performedTime = new Date();
        }
        if (updateTransactionDto.status === index_enum_1.TransactionStatus.PENDING_CANCELED) {
            transaction.canceledTime = new Date();
        }
        const updated = await this.transactionRepo.save(transaction);
        return (0, success_response_1.successRes)(updated);
    }
    async remove(id) {
        const transaction = await this.transactionRepo.findOne({ where: { id } });
        if (!transaction) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        await this.transactionRepo.remove(transaction);
        return (0, success_response_1.successRes)({ message: 'Transaction deleted successfully' });
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map