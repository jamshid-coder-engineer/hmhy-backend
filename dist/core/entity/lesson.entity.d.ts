import { Teacher } from './teacher.entity';
import { Student } from './student.entity';
import { LessonStatus } from 'src/common/enum/index.enum';
import { BaseEntity } from './base.entity';
import { Notification } from './notification.entity';
export declare class Lesson extends BaseEntity {
    name: string;
    startTime: Date;
    endTime: Date;
    teacherId: string;
    studentId: string;
    teacher: Teacher;
    student: Student;
    googleMeetUrl?: string;
    status: LessonStatus;
    googleEventId?: string;
    price: number;
    isPaid: boolean;
    teacherPayment?: string;
    bookedAt?: Date;
    remainedSendAt?: Date;
    completedAt?: Date;
    notification?: string;
    transaction?: string;
    notifications?: Notification[];
}
