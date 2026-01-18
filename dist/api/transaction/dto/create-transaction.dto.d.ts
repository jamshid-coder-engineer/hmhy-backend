import { TransactionStatus } from 'src/common/enum/index.enum';
export declare class CreateTransactionDto {
    lesson: string;
    student: string;
    price: number;
    status: TransactionStatus;
    reason?: string;
}
