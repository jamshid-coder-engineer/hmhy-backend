"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRequestUser = void 0;
const common_1 = require("@nestjs/common");
exports.GetRequestUser = (0, common_1.createParamDecorator)(async (data, context) => {
    try {
        const request = context.switchToHttp().getRequest();
        const user = request[data];
        return user;
    }
    catch (error) {
        throw new common_1.InternalServerErrorException(`Error on get request user: ${error}`);
    }
});
//# sourceMappingURL=get-req-user.decorator.js.map