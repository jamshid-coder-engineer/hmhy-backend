"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleCalendarService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const config_1 = require("../../config");
let GoogleCalendarService = class GoogleCalendarService {
    createOAuthClient() {
        return new googleapis_1.google.auth.OAuth2(config_1.config.GOOGLE_AUTH.GOOGLE_CLIENT_ID, config_1.config.GOOGLE_AUTH.GOOGLE_CLIENT_SECRET, config_1.config.GOOGLE_AUTH.GOOGLE_CALLBACK_URL);
    }
    async getClient(teacher) {
        if (!teacher.googleRefreshToken) {
            throw new common_1.BadRequestException("Google Calendar qayta ulangan bolishi kerak (refresh token yoq).");
        }
        const oauth2Client = this.createOAuthClient();
        oauth2Client.setCredentials({
            access_token: teacher.googleAccessToken || undefined,
            refresh_token: teacher.googleRefreshToken || undefined,
        });
        try {
            const { token } = await oauth2Client.getAccessToken();
            if (token && token !== teacher.googleAccessToken) {
                teacher.googleAccessToken = token;
            }
        }
        catch (e) {
            throw new common_1.BadRequestException("Google token yaroqsiz. Iltimos, Google’ni qayta ulang.");
        }
        return googleapis_1.google.calendar({ version: 'v3', auth: oauth2Client });
    }
};
exports.GoogleCalendarService = GoogleCalendarService;
exports.GoogleCalendarService = GoogleCalendarService = __decorate([
    (0, common_1.Injectable)()
], GoogleCalendarService);
//# sourceMappingURL=google-calendar.service.js.map