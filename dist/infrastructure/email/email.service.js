"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
let EmailService = EmailService_1 = class EmailService {
    mailerService;
    configService;
    logger = new common_1.Logger(EmailService_1.name);
    constructor(mailerService, configService) {
        this.mailerService = mailerService;
        this.configService = configService;
    }
    async sendWelcomeEmail(data) {
        try {
            await this.mailerService.sendMail({
                to: data.email,
                subject: 'Welcome to HMHY Education! 🎓',
                template: './welcome',
                context: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    appUrl: this.configService.get('APP_URL'),
                },
            });
            this.logger.log(`Welcome email sent to ${data.email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send welcome email to ${data.email}:`, error);
            throw error;
        }
    }
    async sendLessonReminder(data) {
        try {
            await this.mailerService.sendMail({
                to: data.email,
                subject: `Lesson Reminder: ${data.subject} 📚`,
                template: './lesson-reminder',
                context: {
                    studentName: data.studentName,
                    teacherName: data.teacherName,
                    subject: data.subject,
                    startTime: data.startTime.toLocaleString('uz-UZ'),
                    meetLink: data.meetLink,
                },
            });
            this.logger.log(`Lesson reminder sent to ${data.email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send lesson reminder to ${data.email}:`, error);
        }
    }
    async sendPaymentConfirmation(data) {
        try {
            await this.mailerService.sendMail({
                to: data.email,
                subject: 'Payment Confirmation ✅',
                template: './payment-confirmation',
                context: {
                    studentName: data.studentName,
                    amount: data.amount.toLocaleString(),
                    transactionId: data.transactionId,
                    lessonSubject: data.lessonSubject,
                    paymentDate: data.paymentDate.toLocaleString('uz-UZ'),
                },
            });
            this.logger.log(`Payment confirmation sent to ${data.email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send payment confirmation to ${data.email}:`, error);
        }
    }
    async sendTeacherPaymentNotification(data) {
        try {
            await this.mailerService.sendMail({
                to: data.email,
                subject: 'Payment Notification 💰',
                template: './teacher-payment',
                context: {
                    teacherName: data.teacherName,
                    amount: data.amount.toLocaleString(),
                    period: data.period,
                    totalLessons: data.totalLessons,
                },
            });
            this.logger.log(`Teacher payment notification sent to ${data.email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send teacher payment notification to ${data.email}:`, error);
        }
    }
    async sendEmail(data) {
        try {
            await this.mailerService.sendMail({
                to: data.to,
                subject: data.subject,
                text: data.text,
                html: data.html,
            });
            this.logger.log(`Email sent to ${data.to}`);
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${data.to}:`, error);
            throw error;
        }
    }
    async sendBulkEmail(data) {
        const promises = data.recipients.map((email) => this.sendEmail({
            to: email,
            subject: data.subject,
            text: data.text,
            html: data.html,
        }));
        await Promise.allSettled(promises);
        this.logger.log(`Bulk email sent to ${data.recipients.length} recipients`);
    }
    async sendTeacherLessonReminder(data) {
        try {
            await this.mailerService.sendMail({
                to: data.email,
                subject: `Lesson Reminder: ${data.subject} 📚`,
                template: './teacher-lesson-reminder',
                context: {
                    teacherName: data.teacherName,
                    studentName: data.studentName,
                    subject: data.subject,
                    startTime: data.startTime.toLocaleString('uz-UZ'),
                    meetLink: data.meetLink,
                },
            });
            this.logger.log(`Teacher lesson reminder sent to ${data.email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send teacher lesson reminder to ${data.email}:`, error);
        }
    }
    async sendTeacherWelcomeEmail(data) {
        try {
            await this.mailerService.sendMail({
                to: data.email,
                subject: 'Welcome to HMHY Education! 🎓',
                template: './teacher-welcome',
                context: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    appUrl: this.configService.get('APP_URL'),
                },
            });
            this.logger.log(`Teacher welcome email sent to ${data.email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send teacher welcome email to ${data.email}:`, error);
            throw error;
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map