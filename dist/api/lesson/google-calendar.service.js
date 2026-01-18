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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleCalendarService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const config_1 = require("../../config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const teacher_entity_1 = require("../../core/entity/teacher.entity");
let GoogleCalendarService = class GoogleCalendarService {
    teacherRepo;
    constructor(teacherRepo) {
        this.teacherRepo = teacherRepo;
    }
    createOAuthClient() {
        return new googleapis_1.google.auth.OAuth2(config_1.config.GOOGLE_AUTH.GOOGLE_CLIENT_ID, config_1.config.GOOGLE_AUTH.GOOGLE_CLIENT_SECRET, config_1.config.GOOGLE_AUTH.GOOGLE_CALLBACK_URL);
    }
    async getClient(teacher) {
        const oauth2Client = this.createOAuthClient();
        if (!teacher.googleRefreshToken) {
            console.error("Refresh token topilmadi! Bazadagi holat:", teacher);
            throw new common_1.BadRequestException("Google bilan qayta bog'laning (Refresh token yo'q)");
        }
        oauth2Client.setCredentials({
            access_token: teacher.googleAccessToken || undefined,
            refresh_token: teacher.googleRefreshToken || undefined,
        });
        oauth2Client.on('tokens', async (tokens) => {
            let changed = false;
            if (tokens.access_token && tokens.access_token !== teacher.googleAccessToken) {
                teacher.googleAccessToken = tokens.access_token;
                changed = true;
            }
            if (tokens.refresh_token && tokens.refresh_token !== teacher.googleRefreshToken) {
                teacher.googleRefreshToken = tokens.refresh_token;
                changed = true;
            }
            if (changed) {
                await this.teacherRepo.save(teacher);
            }
        });
        try {
            await oauth2Client.getAccessToken();
        }
        catch {
            throw new common_1.BadRequestException("Google token yaroqsiz. Iltimos, Google’ni qayta ulang.");
        }
        return googleapis_1.google.calendar({ version: 'v3', auth: oauth2Client });
    }
};
exports.GoogleCalendarService = GoogleCalendarService;
exports.GoogleCalendarService = GoogleCalendarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GoogleCalendarService);
//# sourceMappingURL=google-calendar.service.js.map