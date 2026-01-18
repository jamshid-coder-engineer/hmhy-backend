"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherModule = void 0;
const common_1 = require("@nestjs/common");
const teacher_service_1 = require("./teacher.service");
const teacher_controller_1 = require("./teacher.controller");
const crypto_service_1 = require("../../infrastructure/crypto/crypto.service");
const Token_1 = require("../../infrastructure/token/Token");
const typeorm_1 = require("@nestjs/typeorm");
const teacher_entity_1 = require("../../core/entity/teacher.entity");
const jwt_1 = require("@nestjs/jwt");
const google_strategy_1 = require("./strategy/google.strategy");
const email_module_1 = require("../../infrastructure/email/email.module");
let TeacherModule = class TeacherModule {
};
exports.TeacherModule = TeacherModule;
exports.TeacherModule = TeacherModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([teacher_entity_1.Teacher]), jwt_1.JwtModule, email_module_1.EmailModule],
        controllers: [teacher_controller_1.TeacherController],
        providers: [teacher_service_1.TeacherService, crypto_service_1.CryptoService, Token_1.TokenService, google_strategy_1.GoogleStrategy],
    })
], TeacherModule);
//# sourceMappingURL=teacher.module.js.map