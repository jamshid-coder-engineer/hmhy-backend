"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pager = void 0;
class Pager {
    statusCode;
    message;
    data;
    totalElements;
    totalPages;
    pageSize;
    currentPage;
    from;
    to;
    static of(statusCode, message, data, totalElements, pageSize, currentPage) {
        const from = totalElements === 0 ? 0 : (currentPage - 1) * pageSize + 1;
        const to = Math.min(currentPage * pageSize, totalElements);
        return new Pager(statusCode, message, data, totalElements, Math.ceil(totalElements / pageSize), pageSize, currentPage, from, to).toPage();
    }
    constructor(statusCode, message, data, totalElements, totalPages, pageSize, currentPage, from, to) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.pageSize = pageSize;
        this.currentPage = currentPage;
        this.from = from;
        this.to = to;
    }
    toPage() {
        return {
            statusCode: this.statusCode,
            message: {
                uz: this.message.uz,
                ru: this.message.ru,
                en: this.message.en,
            },
            data: this.data,
            totalElements: this.totalElements,
            totalPages: this.totalPages,
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            from: this.from,
            to: this.to,
        };
    }
}
exports.Pager = Pager;
//# sourceMappingURL=Pager.js.map