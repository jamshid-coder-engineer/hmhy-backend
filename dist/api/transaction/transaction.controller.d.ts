import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(createTransactionDto: CreateTransactionDto): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    findAll(): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    getStats(): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    findOne(id: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    remove(id: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
}
