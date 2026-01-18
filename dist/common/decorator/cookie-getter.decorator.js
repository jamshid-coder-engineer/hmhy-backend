"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieGetter = void 0;
const common_1 = require("@nestjs/common");
exports.CookieGetter = (0, common_1.createParamDecorator)(async (data, context) => {
    try {
        const request = context.switchToHttp().getRequest();
        const refreshToken = request.cookies[data];
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token not found');
        }
        return refreshToken;
    }
    catch (error) {
        throw new common_1.InternalServerErrorException(`Error on reading cookie: ${error}`);
    }
});
//# sourceMappingURL=cookie-getter.decorator.js.map