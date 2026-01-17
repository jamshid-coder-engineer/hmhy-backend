interface ConfigType {
    DB_URL: string;
    PORT: string;
    NODE_ENV: string;
    TOKEN: {
        ACCESS_TOKEN_KEY: string;
        ACCESS_TOKEN_TIME: number;
        REFRESH_TOKEN_KEY: string;
        REFRESH_TOKEN_TIME: number;
        JWT_SECRET_KEY: string;
    };
    SUPERADMIN: {
        SUPERADMIN_USERNAME: string;
        SUPERADMIN_PASSWORD: string;
        SUPER_ADMIN_PHONE_NUMBER: string;
    };
    GOOGLE_AUTH: {
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        GOOGLE_CALLBACK_URL: string;
    };
    FRONTEND_URL: string;
    SWAGGER_URL: string;
    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_PASSWORD: string;
    REDIS_URL: string;
    TELEGRAM_BOT_TOKEN: string;
    BACKEND_URL: string;
    MAIL: {
        MAIL_PASS: string;
        MAIL_HOST: string;
        MAIL_PORT: number;
        MAIL_SECURE: boolean;
        MAIL_USER: string;
    };
}
export declare const config: ConfigType;
export {};
