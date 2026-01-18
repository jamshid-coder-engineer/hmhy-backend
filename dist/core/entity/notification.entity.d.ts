import { BaseEntity } from './base.entity';
import { Student } from './student.entity';
import { Lesson } from './lesson.entity';
import { NotificationChannel, NotificationType } from 'src/common/enum/index.enum';
export declare class Notification extends BaseEntity {
    title: string;
    message: string;
    type: NotificationType;
    channel: NotificationChannel;
    studentId: string;
    student: Student;
    lessonId: string;
    lesson: Lesson;
    isRead: boolean;
    isCancelled: boolean;
    readAt: Date;
    isSent: boolean;
    sentAt: Date;
    sendAt: Date | null;
    metadata: any;
}
