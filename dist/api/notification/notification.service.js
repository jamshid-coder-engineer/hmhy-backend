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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
const lesson_entity_1 = require("../../core/entity/lesson.entity");
let NotificationService = NotificationService_1 = class NotificationService {
    lessonRepo;
    bot;
    logger = new common_1.Logger(NotificationService_1.name);
    constructor(lessonRepo) {
        this.lessonRepo = lessonRepo;
    }
    async onModuleInit() {
        try {
            await this.bot.telegram.getMe();
            console.log(' Telegram bot initialized');
        }
        catch (error) {
            console.error(' Telegram bot init failed:', error.message);
        }
    }
    async handleLessonReminders() {
        const now = new Date();
        const startWindow = new Date(now.getTime() - 5 * 60000);
        const endWindow = new Date(now.getTime() + 25 * 60000);
        try {
            const upcomingLessons = await this.lessonRepo.find({
                where: {
                    startTime: (0, typeorm_2.Between)(startWindow, endWindow),
                },
                relations: ['student'],
            });
            if (upcomingLessons.length === 0) {
                const next2Hours = new Date(now.getTime() + 120 * 60000);
                const allUpcoming = await this.lessonRepo.find({
                    where: {
                        startTime: (0, typeorm_2.Between)(now, next2Hours),
                    },
                    order: { startTime: 'ASC' },
                    take: 3,
                });
                if (allUpcoming.length > 0) {
                    allUpcoming.forEach(l => {
                    });
                }
                else {
                }
            }
            for (const lesson of upcomingLessons) {
                const student = lesson.student;
                if (!student) {
                    this.logger.warn(`⚠️ Dars ID: ${lesson.id} uchun student biriktirilmagan.`);
                    continue;
                }
                await this.sendTelegramReminder(student, lesson);
            }
        }
        catch (error) {
        }
    }
    async sendTelegramReminder(student, lesson) {
        if (!student.tgId) {
            this.logger.warn(`⚠️ Student (ID: ${student.id}) da Telegram ID yo'q.`);
            return;
        }
        const dateObj = new Date(lesson.startTime);
        const timeString = dateObj.toLocaleTimeString('uz-UZ', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Tashkent',
        });
        const message = `🔔 *Dars eslatmasi!*\n\n` +
            `📚 *Fan:* ${lesson.name || 'Dars'}\n` +
            `⏰ *Vaqt:* ${timeString}\n` +
            `📍 *Link:* ${lesson.googleMeetUrl || 'Onlayn'}\n\n` +
            `Iltimos, darsga kechikmasdan kiring!`;
        try {
            if (!this.bot) {
                return;
            }
            await this.bot.telegram.sendMessage(student.tgId, message, {
                parse_mode: 'Markdown',
            });
        }
        catch (error) {
        }
    }
};
exports.NotificationService = NotificationService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationService.prototype, "handleLessonReminders", null);
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationService);
//# sourceMappingURL=notification.service.js.map