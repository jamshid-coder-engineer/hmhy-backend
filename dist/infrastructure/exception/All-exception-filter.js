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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AllExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("typeorm");
const geoip = __importStar(require("geoip-lite"));
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    httpAdapterHost;
    logger = new common_1.Logger(AllExceptionsFilter_1.name);
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        let httpStatus = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errorType = 'InternalServerError';
        if (exception instanceof common_1.HttpException) {
            httpStatus = exception.getStatus();
            const responseBody = exception.getResponse();
            if (httpStatus === 429) {
                message = 'Rate limit exceeded (Potential DDoS attack)';
                errorType = 'TooManyRequests';
            }
            else if (typeof responseBody === 'object' && responseBody !== null) {
                const msg = responseBody.message;
                message = Array.isArray(msg)
                    ? msg
                    : msg || responseBody.error || message;
                errorType = responseBody.error || errorType;
            }
            else if (typeof responseBody === 'string') {
                message = responseBody;
            }
        }
        else if (exception instanceof typeorm_1.QueryFailedError) {
            if (exception.code === '23505') {
                httpStatus = common_1.HttpStatus.CONFLICT;
                message = 'Duplicate entry';
                errorType = 'Conflict';
            }
            else {
                message = 'Database error';
            }
        }
        else if (exception &&
            typeof exception === 'object' &&
            'statusCode' in exception) {
            const errObj = exception;
            httpStatus = errObj.statusCode || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message = errObj.message || message;
            errorType = errObj.error || errorType;
        }
        const shouldLog = httpStatus >= 500 || httpStatus === 429;
        if (shouldLog) {
            const clientIp = request.headers['x-forwarded-for']?.split(',')[0] ||
                request.ip ||
                'Unknown IP';
            const geo = geoip.lookup(clientIp);
            const country = geo ? geo.country : 'Unknown/Local';
            const userAgent = request.headers['user-agent'] || 'Unknown Device';
            const errorLog = {
                statusCode: httpStatus,
                message: message,
                path: request.url,
                method: request.method,
                ip: clientIp,
                country: country,
                device: userAgent,
                timestamp: new Date().toISOString(),
            };
            if (httpStatus === 429) {
                this.logger.warn(`⚠️  DDoS ALERT | IP: ${clientIp} (${country}) | ${JSON.stringify(errorLog)}`);
            }
            else {
                this.logger.error(`SERVER ERROR | Country: ${country} | ${JSON.stringify(errorLog)}`, exception.stack || null);
            }
        }
        const responseBody = {
            statusCode: httpStatus,
            message: message,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(request),
            method: request.method,
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], AllExceptionsFilter);
//# sourceMappingURL=All-exception-filter.js.map