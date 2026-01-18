"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successRes = void 0;
const successRes = (data, statusCode = 200) => {
    setTimeout(() => {
    });
    return {
        statusCode,
        message: {
            uz: 'Amaliyot muvaffaqiyatli bajarildi',
            en: 'Operation successfully completed',
            ru: 'Операция успешно выполнена',
        },
        data,
    };
};
exports.successRes = successRes;
//# sourceMappingURL=success.response.js.map