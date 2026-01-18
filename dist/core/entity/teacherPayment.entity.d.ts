import { BaseEntity } from './base.entity';
import { Teacher } from './teacher.entity';
export declare class TeacherPayment extends BaseEntity {
    teacher: string;
    teacherRelation: Teacher;
    lessons: string[];
    totalLessonAmount: number;
    platformComission: number;
    platformAmount: number;
    teacherAmount: number;
    paidBy: string;
    paidAt: Date;
    isCanceled: boolean;
    canceledAt: Date;
    canceledBy: string;
    canceledReason: string;
    notes: string;
}
