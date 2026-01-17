"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const winston_config_1 = require(".././infrastructure/winston/winston-config");
const app_module_1 = require(".././api/app.module");
const All_exception_filter_1 = require(".././infrastructure/exception/All-exception-filter");
const config_1 = require("../config");
let Application = class Application {
    API_PREFIX = 'api/v1';
    SWAGGER_PATH = 'api/docs';
    CORS_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';
    LOG_LEVELS = [
        'log',
        'error',
        'warn',
        'debug',
        'verbose',
    ];
    async start() {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, {
            logger: winston_config_1.winstonConfig,
        });
        this.setupCors(app);
        this.setupGlobalPrefix(app);
        this.setupMiddlewares(app);
        this.setupInterceptors(app);
        this.setupFilters(app);
        this.setupPipes(app);
        this.setupSwagger(app);
        await this.startServer(app);
    }
    setupCors(app) {
        const allowedOrigins = [
            'http://localhost:5173',
            'https://hmhy-frontend.netlify.app',
        ];
        const isNgrokOrigin = (origin) => /^https:\/\/.*\.ngrok-free\.dev$/.test(origin);
        app.enableCors({
            origin: (origin, callback) => {
                if (!origin) {
                    return callback(null, true);
                }
                if (allowedOrigins.includes(origin) || isNgrokOrigin(origin)) {
                    return callback(null, true);
                }
                return callback(new Error(`CORS blocked origin: ${origin}`), false);
            },
            credentials: true,
            methods: this.CORS_METHODS,
        });
    }
    setupGlobalPrefix(app) {
        app.setGlobalPrefix(this.API_PREFIX);
    }
    setupMiddlewares(app) {
        app.use((0, cookie_parser_1.default)());
    }
    setupInterceptors(app) {
        app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    }
    setupFilters(app) {
        const httpAdapter = app.get(core_1.HttpAdapterHost);
        app.useGlobalFilters(new All_exception_filter_1.AllExceptionsFilter(httpAdapter));
    }
    setupPipes(app) {
        app.useLogger([...this.LOG_LEVELS]);
        app.useGlobalPipes(this.createValidationPipe());
    }
    createValidationPipe() {
        return new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
            transformOptions: {
                enableImplicitConversion: true,
            },
            validationError: {
                target: false,
            },
            stopAtFirstError: true,
            disableErrorMessages: config_1.config.NODE_ENV === 'production',
            exceptionFactory: this.validationExceptionFactory,
        });
    }
    validationExceptionFactory(errors) {
        const messages = errors
            .map((err) => Object.values(err.constraints || {}))
            .flat();
        return {
            statusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
            message: messages,
            error: 'Unprocessable Entity',
        };
    }
    setupSwagger(app) {
        const swaggerConfig = new swagger_1.DocumentBuilder()
            .setTitle('CRM API')
            .setDescription('CRM API')
            .setVersion('1.0')
            .addTag('CRM API')
            .addBearerAuth({
            type: 'http',
            scheme: 'Bearer',
            in: 'Header',
        })
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
        swagger_1.SwaggerModule.setup(this.SWAGGER_PATH, app, document);
    }
    async startServer(app) {
        const port = Number(process.env.PORT) || 3000;
        await app.listen(port, '0.0.0.0');
        console.log('Server running on port:', port);
    }
};
exports.Application = Application;
exports.Application = Application = __decorate([
    (0, common_1.Injectable)()
], Application);
//# sourceMappingURL=app.service.js.map