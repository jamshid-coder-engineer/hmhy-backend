"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryPager = void 0;
const Pager_1 = require("./Pager");
class RepositoryPager {
    static DEFAULT_PAGE = 1;
    static DEFAULT_PAGE_SIZE = 10;
    static async findAll(repository, options) {
        const normalizedOptions = RepositoryPager.normalizePagination(options);
        const [data, count] = await repository.findAndCount(normalizedOptions);
        return Pager_1.Pager.of(200, {
            uz: 'Amaliyot muvaffaqiyatli bajarildi',
            en: 'Operation successfully completed',
            ru: 'Операция успешно выполнена',
        }, data, count, normalizedOptions.take || this.DEFAULT_PAGE_SIZE, options?.page || this.DEFAULT_PAGE);
    }
    static normalizePagination(options) {
        const page = options?.page && options.page > 0
            ? options.page
            : RepositoryPager.DEFAULT_PAGE;
        const limit = options?.limit && options.limit > 0
            ? options.limit
            : RepositoryPager.DEFAULT_PAGE_SIZE;
        const skip = (page - 1) * limit;
        return {
            ...options,
            take: limit,
            skip: skip,
        };
    }
}
exports.RepositoryPager = RepositoryPager;
//# sourceMappingURL=RepositoryPager.js.map