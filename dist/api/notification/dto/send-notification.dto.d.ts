import { NotificationChannel, NotificationType } from 'src/common/enum/index.enum';
export declare class SendNotificationDto {
    studentIds: string[];
    type: NotificationType;
    title: string;
    message: string;
    channel?: NotificationChannel;
    metadata?: any;
}
