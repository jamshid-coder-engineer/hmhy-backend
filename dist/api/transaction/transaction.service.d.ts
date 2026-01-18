import { Repository } from 'typeorm';
import { Transaction } from '../../core/entity/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionService {
    private readonly transactionRepo;
    constructor(transactionRepo: Repository<Transaction>);
    create(createTransactionDto: CreateTransactionDto): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    findAll(): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    getStats(): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    findOne(id: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    remove(id: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
}
