import { NotificationChannel, NotificationType } from 'src/common/enum/index.enum';
export declare class CreateNotificationDto {
    studentId: string;
    type: NotificationType;
    title: string;
    message: string;
    channel?: NotificationChannel;
    sendAt?: string;
    metadata?: any;
}
