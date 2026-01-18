"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const success_response_1 = require("../response/success.response");
const RepositoryPager_1 = require("../pagination/RepositoryPager");
class BaseService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    get getRepository() {
        return this.repository;
    }
    async create(dto) {
        let data = this.repository.create({
            ...dto,
        });
        data = await this.repository.save(data);
        return (0, success_response_1.successRes)(data, 201);
    }
    async findAll(options) {
        const data = (await this.repository.find({
            ...options,
        }));
        return (0, success_response_1.successRes)(data);
    }
    async softDelete(id, dto, adminId) {
        const user = await this.repository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.HttpException('User not found', 404);
        }
        user.isDelete = true;
        user.reasonDelete = dto.reason;
        user.deletedBy = adminId;
        const updateData = this.repository.update(id, user);
        return (0, success_response_1.successRes)({ updateData });
    }
    async findAllWithPagination(options) {
        const { search, ...otherOptions } = options;
        if (search) {
            otherOptions.where = [
                { username: (0, typeorm_1.ILike)(`%${search}%`) },
                { phoneNumber: (0, typeorm_1.ILike)(`%${search}%`) },
            ];
        }
        return await RepositoryPager_1.RepositoryPager.findAll(this.getRepository, otherOptions);
    }
    async findOneBy(options) {
        const data = (await this.repository.findOne({
            select: options.select || {},
            relations: options.relations || [],
            where: options.where,
        }));
        if (!data) {
            throw new common_1.NotFoundException();
        }
        return (0, success_response_1.successRes)(data);
    }
    async findOneById(id, options) {
        const data = (await this.repository.findOne({
            select: options?.select || {},
            relations: options?.relations || [],
            where: { id, ...options?.where },
        }));
        if (!data) {
            throw new common_1.NotFoundException();
        }
        return (0, success_response_1.successRes)(data);
    }
    async update(id, dto) {
        await this.findOneById(id);
        await this.repository.update(id, dto);
        const data = await this.repository.findOne({ where: { id } });
        return (0, success_response_1.successRes)(data);
    }
    async delete(id) {
        await this.findOneById(id);
        (await this.repository.delete(id));
        return (0, success_response_1.successRes)({});
    }
    async restoreTeacher(id) {
        const user = await this.repository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.HttpException('User not found', 404);
        }
        user.isDelete = false;
        const updateData = this.repository.update(id, user);
        return (0, success_response_1.successRes)({ updateData });
    }
    async updateStatus(id) {
        const user = await this.repository.findOne({
            where: { id },
            select: ['id', 'isActive'],
        });
        if (!user) {
            throw new common_1.HttpException('User not found', 404);
        }
        const newStatus = !user.isActive;
        await this.repository.update(id, { isActive: newStatus });
        return (0, success_response_1.successRes)({
            message: 'Status updated successfully',
            isActive: newStatus,
        });
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base-service.js.map