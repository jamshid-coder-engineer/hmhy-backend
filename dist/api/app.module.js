"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const config_2 = require("../config");
const admin_module_1 = require("./admin/admin.module");
const auth_module_1 = require("./auth/auth.module");
const teacher_module_1 = require("./teacher/teacher.module");
const jwt_1 = require("@nestjs/jwt");
const ioredis_1 = require("@nestjs-modules/ioredis");
const lesson_module_1 = require("./lesson/lesson.module");
const lesson_history_module_1 = require("./lesson-history/lesson-history.module");
const notification_module_1 = require("./notification/notification.module");
const transaction_module_1 = require("./transaction/transaction.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: async () => ({
                    type: 'postgres',
                    url: config_2.config.DB_URL,
                    synchronize: true,
                    entities: ['dist/core/entity/*.entity{.ts,.js}'],
                    autoLoadEntities: true,
                    ssl: config_2.config.NODE_ENV === 'production'
                        ? { rejectUnauthorized: false }
                        : false,
                }),
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: config_2.config.TOKEN.JWT_SECRET_KEY,
                signOptions: { expiresIn: config_2.config.TOKEN.ACCESS_TOKEN_TIME },
            }),
            ioredis_1.RedisModule.forRoot({
                type: 'single',
                options: {
                    host: process.env.REDIS_HOST,
                    port: Number(process.env.REDIS_PORT),
                    password: process.env.REDIS_PASSWORD,
                },
            }),
            auth_module_1.AuthModule,
            admin_module_1.AdminModule,
            teacher_module_1.TeacherModule,
            lesson_module_1.LessonModule,
            lesson_history_module_1.LessonHistoryModule,
            lesson_history_module_1.LessonHistoryModule,
            notification_module_1.NotificationModule,
            transaction_module_1.TransactionModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map