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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../../config");
let TokenService = class TokenService {
    jwt;
    constructor(jwt) {
        this.jwt = jwt;
    }
    async accessToken(payload) {
        return this.jwt.signAsync(payload, {
            secret: config_1.config.TOKEN.ACCESS_TOKEN_KEY,
            expiresIn: config_1.config.TOKEN.ACCESS_TOKEN_TIME * 24 * 60 * 60,
        });
    }
    async refreshToken(payload) {
        return this.jwt.signAsync(payload, {
            secret: config_1.config.TOKEN.REFRESH_TOKEN_KEY,
            expiresIn: config_1.config.TOKEN.REFRESH_TOKEN_TIME * 24 * 60 * 60,
        });
    }
    async writeCookie(res, key, value, time) {
        res.cookie(key, value, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: time * 24 * 60 * 60 * 1000,
            path: '/',
        });
    }
    async verifyToken(token, secretKey) {
        return this.jwt.verifyAsync(token, { secret: secretKey });
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], TokenService);
//# sourceMappingURL=Token.js.map