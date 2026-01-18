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
var StudentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const telegraf_1 = require("telegraf");
const student_entity_1 = require("../../core/entity/student.entity");
const index_enum_1 = require("../../common/enum/index.enum");
const config_1 = require("../../config");
const base_service_1 = require("../../infrastructure/base/base-service");
const typeorm_2 = require("typeorm");
let StudentService = StudentService_1 = class StudentService extends base_service_1.BaseService {
    studentRepo;
    bot;
    sessions = new Map();
    logger = new common_1.Logger(StudentService_1.name);
    constructor(studentRepo) {
        super(studentRepo);
        this.studentRepo = studentRepo;
        this.bot = new telegraf_1.Telegraf(config_1.config.TELEGRAM_BOT_TOKEN);
        this.initializeBot();
    }
    assertFrom(ctx) {
        if (!ctx.from)
            throw new Error("Foydalanuvchi ma'lumotlari topilmadi");
    }
    getWebAppUrl() {
        return new URL('/student/login', config_1.config.FRONTEND_URL).toString();
    }
    async sendOpenAppButtons(ctx) {
        const url = this.getWebAppUrl();
        await ctx.reply('🎓 Platformaga kirish:', telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.webApp('📚 WebApp ochish', url)],
            [telegraf_1.Markup.button.url('🌐 Brauzerda ochish', url)],
        ]));
        this.logger.log(`WEBAPP URL => ${url}`);
    }
    initializeBot() {
        this.bot.command('openapp', async (ctx) => {
            try {
                await this.sendOpenAppButtons(ctx);
            }
            catch (e) {
                this.logger.error('openapp command error:', e);
                await ctx.reply('Xatolik yuz berdi. Qaytadan urinib ko‘ring.');
            }
        });
        this.bot.start(async (ctx) => {
            try {
                this.assertFrom(ctx);
                const tgId = ctx.from.id.toString();
                const existingStudent = await this.studentRepo.findOne({
                    where: { tgId },
                });
                if (existingStudent) {
                    await ctx.reply(`Siz allaqachon ro'yxatdan o'tgansiz!\n\n` +
                        `👤 Ism: ${existingStudent.firstName}\n` +
                        `👤 Familiya: ${existingStudent.lastName}\n` +
                        `📱 Telefon: ${existingStudent.phoneNumber}`, telegraf_1.Markup.removeKeyboard());
                    await this.sendOpenAppButtons(ctx);
                    this.sessions.delete(ctx.from.id);
                    return;
                }
                this.sessions.set(ctx.from.id, { step: 'WAITING_FIRST_NAME' });
                await ctx.reply("👋 Assalomu aleykum! O'quv platformasiga xush kelibsiz.\n\n" +
                    "📝 Ro'yxatdan o'tish uchun ma'lumotlarni kiriting.\n\n" +
                    "👤 Ismingizni kiriting:");
            }
            catch (error) {
                this.logger.error('Start command error:', error);
                await ctx.reply("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
            }
        });
        this.bot.on('text', async (ctx) => {
            try {
                this.assertFrom(ctx);
                const session = this.sessions.get(ctx.from.id);
                if (!session) {
                    await ctx.reply("Ro'yxatdan o'tish uchun /start buyrug'ini yuboring.");
                    return;
                }
                await this.handleRegistrationStep(ctx, session);
            }
            catch (error) {
                this.logger.error('Text handler error:', error);
                await ctx.reply("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
            }
        });
        this.bot.on('contact', async (ctx) => {
            try {
                this.assertFrom(ctx);
                const session = this.sessions.get(ctx.from.id);
                if (!session || session.step !== 'WAITING_PHONE') {
                    await ctx.reply("Iltimos, avval /start buyrug'ini yuboring.");
                    return;
                }
                if (!ctx.message || !('contact' in ctx.message)) {
                    await ctx.reply('Telefon raqam topilmadi.');
                    return;
                }
                const phoneNumber = ctx.message.contact.phone_number;
                await this.completeRegistration(ctx, session, phoneNumber);
            }
            catch (error) {
                this.logger.error('Contact handler error:', error);
                await ctx.reply("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
            }
        });
        this.bot.catch((err, ctx) => {
            this.logger.error(`Bot error for ${ctx.from?.id}:`, err);
            ctx.reply("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
        });
        this.bot
            .launch()
            .then(() => this.logger.log('Student registration bot started successfully'))
            .catch((e) => this.logger.error('Student bot launch failed:', e));
        process.once('SIGINT', () => this.bot.stop('SIGINT'));
        process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
    }
    async handleRegistrationStep(ctx, session) {
        const text = ctx.message.text?.trim();
        if (!text) {
            await ctx.reply('Iltimos, matn kiriting.');
            return;
        }
        switch (session.step) {
            case 'WAITING_FIRST_NAME':
                if (text.length < 2 || text.length > 50) {
                    await ctx.reply("Ism 2-50 belgi orasida bo'lishi kerak. Qaytadan kiriting:");
                    return;
                }
                session.firstName = text;
                session.step = 'WAITING_LAST_NAME';
                this.sessions.set(ctx.from.id, session);
                await ctx.reply('✅ Ism qabul qilindi!\n\n👤 Familiyangizni kiriting:');
                break;
            case 'WAITING_LAST_NAME':
                if (text.length < 2 || text.length > 50) {
                    await ctx.reply("Familiya 2-50 belgi orasida bo'lishi kerak. Qaytadan kiriting:");
                    return;
                }
                session.lastName = text;
                session.step = 'WAITING_PHONE';
                this.sessions.set(ctx.from.id, session);
                await ctx.reply('✅ Familiya qabul qilindi!\n\n📱 Endi telefon raqamingizni yuboring.', telegraf_1.Markup.keyboard([
                    telegraf_1.Markup.button.contactRequest('📱 Telefon raqamni ulashish'),
                ]).resize());
                break;
            case 'WAITING_PHONE': {
                let phoneNumber = text.replace(/[\s\-\(\)]/g, '');
                if (!phoneNumber.startsWith('+'))
                    phoneNumber = '+' + phoneNumber;
                const phoneRegex = /^\+?998[0-9]{9}$/;
                if (!phoneRegex.test(phoneNumber)) {
                    await ctx.reply("Noto'g'ri telefon raqam formati!\nIltimos, +998XXXXXXXXX formatida kiriting yoki pastdagi tugmani bosing.", telegraf_1.Markup.keyboard([
                        telegraf_1.Markup.button.contactRequest('📱 Telefon raqamni ulashish'),
                    ]).resize());
                    return;
                }
                await this.completeRegistration(ctx, session, phoneNumber);
                break;
            }
        }
    }
    async completeRegistration(ctx, session, phoneNumber) {
        try {
            this.assertFrom(ctx);
            const tgId = ctx.from.id.toString();
            const existingByTg = await this.studentRepo.findOne({ where: { tgId } });
            if (existingByTg) {
                await ctx.reply("Siz allaqachon ro'yxatdan o'tgansiz.", telegraf_1.Markup.removeKeyboard());
                await this.sendOpenAppButtons(ctx);
                this.sessions.delete(ctx.from.id);
                return;
            }
            const existingPhone = await this.studentRepo.findOne({
                where: { phoneNumber },
            });
            if (existingPhone) {
                await ctx.reply("Bu telefon raqam allaqachon ro'yxatdan o'tgan!\nBoshqa raqam kiriting yoki admin bilan bog'laning.", telegraf_1.Markup.removeKeyboard());
                return;
            }
            const student = this.studentRepo.create({
                firstName: session.firstName,
                lastName: session.lastName,
                phoneNumber,
                tgId,
                tgUsername: ctx.from.username,
                role: index_enum_1.Roles.STUDENT,
                isBlocked: false,
            });
            await this.studentRepo.save(student);
            this.sessions.delete(ctx.from.id);
            await ctx.reply("✅ Ro'yxatdan o'tish muvaffaqiyatli yakunlandi!\n\n" +
                `👤 Ism: ${student.firstName}\n` +
                `👤 Familiya: ${student.lastName}\n` +
                `📱 Telefon: ${student.phoneNumber}\n` +
                `🆔 Telegram: @${student.tgUsername || "username yo'q"}\n\n` +
                "🎓 Endi siz darslarni ko'rishingiz va booking qilishingiz mumkin!", telegraf_1.Markup.removeKeyboard());
            await this.sendOpenAppButtons(ctx);
            this.logger.log(`New student registered: ${student.id} - ${student.firstName} ${student.lastName}`);
        }
        catch (error) {
            this.logger.error('Error completing registration:', error);
            await ctx.reply("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.\nMuammo davom etsa, admin bilan bog'laning.", telegraf_1.Markup.removeKeyboard());
        }
    }
    async onModuleDestroy() {
        await this.bot.stop();
        this.logger.log('Student registration bot stopped');
    }
    async getStats() {
        const [total, active, blocked] = await Promise.all([
            this.studentRepo.count(),
            this.studentRepo.count({ where: { isBlocked: false } }),
            this.studentRepo.count({ where: { isBlocked: true } }),
        ]);
        return {
            totalStudents: total,
            activeStudents: active,
            blockedStudents: blocked,
        };
    }
    async toggleStudentBlock(id, reason) {
        const student = await this.studentRepo.findOne({ where: { id } });
        if (!student)
            throw new common_1.NotFoundException('Student not found');
        if (!student.isBlocked) {
            student.isBlocked = true;
            student.blockedReason = reason || "Sabab ko'rsatilmadi";
        }
        else {
            student.isBlocked = false;
            student.blockedReason = '';
        }
        return await this.studentRepo.save(student);
    }
    async updateStudent(id, updateStudentDto) {
        const { phoneNumber, email } = updateStudentDto;
        const student = await this.studentRepo.findOne({ where: { id } });
        if (!student)
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        if (phoneNumber) {
            const existingPhone = await this.studentRepo.findOne({
                where: { phoneNumber, id: (0, typeorm_2.Not)(id) },
            });
            if (existingPhone) {
                throw new common_1.ConflictException("Bu telefon raqami allaqachon ro‘yxatdan o‘tgan");
            }
        }
        if (email) {
            const existingEmail = await this.studentRepo.findOne({
                where: { email, id: (0, typeorm_2.Not)(id) },
            });
            if (existingEmail) {
                throw new common_1.ConflictException("Bu email manzili allaqachon band");
            }
        }
        Object.assign(student, updateStudentDto);
        return await this.studentRepo.save(student);
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = StudentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [Object])
], StudentService);
//# sourceMappingURL=student.service.js.map