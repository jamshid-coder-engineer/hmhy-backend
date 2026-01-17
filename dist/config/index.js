"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.config = {
    DB_URL: String(process.env.DATABASE_URL || process.env.DB_URL),
    PORT: String(process.env.PORT ?? '5000'),
    NODE_ENV: String(process.env.NODE_ENV),
    TOKEN: {
        ACCESS_TOKEN_KEY: String(process.env.ACCESS_TOKEN_KEY),
        ACCESS_TOKEN_TIME: Number(process.env.ACCESS_TOKEN_TIME),
        REFRESH_TOKEN_KEY: String(process.env.REFRESH_TOKEN_KEY),
        REFRESH_TOKEN_TIME: Number(process.env.REFRESH_TOKEN_TIME),
        JWT_SECRET_KEY: String(process.env.JWT_SECRET_KEY),
    },
    SUPERADMIN: {
        SUPERADMIN_USERNAME: String(process.env.SUPERADMIN_USERNAME),
        SUPERADMIN_PASSWORD: String(process.env.SUPERADMIN_PASSWORD),
        SUPER_ADMIN_PHONE_NUMBER: String(process.env.SUPER_ADMIN_PHONE_NUMBER),
    },
    GOOGLE_AUTH: {
        GOOGLE_CALLBACK_URL: String(process.env.GOOGLE_CALLBACK_URL),
        GOOGLE_CLIENT_ID: String(process.env.GOOGLE_CLIENT_ID),
        GOOGLE_CLIENT_SECRET: String(process.env.GOOGLE_CLIENT_SECRET),
    },
    FRONTEND_URL: String(process.env.FRONTEND_URL || 'http://localhost:5173'),
    SWAGGER_URL: String(process.env.SWAGGER_URL),
    BACKEND_URL: String(process.env.BACKEND_URL),
    REDIS_HOST: String(process.env.REDIS_HOST),
    REDIS_PORT: Number(process.env.REDIS_PORT),
    REDIS_PASSWORD: String(process.env.REDIS_PASSWORD),
    REDIS_URL: String(process.env.REDIS_URL),
    TELEGRAM_BOT_TOKEN: String(process.env.TELEGRAM_BOT_TOKEN),
    MAIL: {
        MAIL_HOST: String(process.env.MAIL_HOST),
        MAIL_PASS: String(process.env.MAIL_PASS),
        MAIL_PORT: Number(process.env.MAIL_PORT),
        MAIL_SECURE: String(process.env.NODE_ENV) === 'production',
        MAIL_USER: String(process.env.MAIL_USER),
    },
};
//# sourceMappingURL=index.js.map