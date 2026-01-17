import { Roles } from 'src/common/enum/index.enum';
import { BaseEntity } from './base.entity';
import { Lesson } from './lesson.entity';
import { Transaction } from './transaction.entity';
import { LessonHistory } from './lessonHistory.entity';
export declare class Student extends BaseEntity {
    lastName: string;
    firstName: string;
    phoneNumber: string;
    role: Roles;
    tgId: string;
    tgUsername: string;
    isBlocked: boolean;
    blockedAt: Date;
    blockedReason: string;
    lesson: string;
    lessonHistory: string;
    notification: string;
    email: string;
    lessons: Lesson[];
    transactions: Transaction[];
    history: LessonHistory[];
    length: number;
}
