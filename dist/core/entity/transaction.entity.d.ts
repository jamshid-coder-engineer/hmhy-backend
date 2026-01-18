import { Student } from './student.entity';
import { TransactionStatus } from 'src/common/enum/index.enum';
import { BaseEntity } from './base.entity';
export declare class Transaction extends BaseEntity {
    lesson: string;
    student: string;
    studentRelation: Student;
    price: number;
    status: TransactionStatus;
    canceledTime: Date;
    performedTime: Date;
    reason: string;
}
