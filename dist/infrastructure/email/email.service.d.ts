import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly mailerService;
    private readonly configService;
    private readonly logger;
    constructor(mailerService: MailerService, configService: ConfigService);
    sendWelcomeEmail(data: {
        email: string;
        firstName: string;
        lastName: string;
    }): Promise<void>;
    sendLessonReminder(data: {
        email: string;
        studentName: string;
        teacherName: string;
        subject: string;
        startTime: Date;
        meetLink?: string;
    }): Promise<void>;
    sendPaymentConfirmation(data: {
        email: string;
        studentName: string;
        amount: number;
        transactionId: string;
        lessonSubject?: string;
        paymentDate: Date;
    }): Promise<void>;
    sendTeacherPaymentNotification(data: {
        email: string;
        teacherName: string;
        amount: number;
        period: string;
        totalLessons: number;
    }): Promise<void>;
    sendEmail(data: {
        to: string;
        subject: string;
        text?: string;
        html?: string;
    }): Promise<void>;
    sendBulkEmail(data: {
        recipients: string[];
        subject: string;
        text?: string;
        html?: string;
    }): Promise<void>;
    sendTeacherLessonReminder(data: {
        email: string;
        teacherName: string;
        studentName: string;
        subject: string;
        startTime: Date;
        meetLink?: string;
    }): Promise<void>;
    sendTeacherWelcomeEmail(data: {
        email: string;
        firstName: string;
        lastName: string;
    }): Promise<void>;
}
