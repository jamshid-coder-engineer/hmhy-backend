"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherPaymentController = void 0;
const common_1 = require("@nestjs/common");
const teacher_payment_service_1 = require("./teacher-payment.service");
const create_teacher_payment_dto_1 = require("./dto/create-teacher-payment.dto");
const update_teacher_payment_dto_1 = require("./dto/update-teacher-payment.dto");
let TeacherPaymentController = class TeacherPaymentController {
    teacherPaymentService;
    constructor(teacherPaymentService) {
        this.teacherPaymentService = teacherPaymentService;
    }
    create(createTeacherPaymentDto) {
        return this.teacherPaymentService.create(createTeacherPaymentDto);
    }
    findAll() {
        return this.teacherPaymentService.findAll();
    }
    findOne(id) {
        return this.teacherPaymentService.findOne(+id);
    }
    update(id, updateTeacherPaymentDto) {
        return this.teacherPaymentService.update(+id, updateTeacherPaymentDto);
    }
    remove(id) {
        return this.teacherPaymentService.remove(+id);
    }
};
exports.TeacherPaymentController = TeacherPaymentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_teacher_payment_dto_1.CreateTeacherPaymentDto]),
    __metadata("design:returntype", void 0)
], TeacherPaymentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TeacherPaymentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeacherPaymentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_teacher_payment_dto_1.UpdateTeacherPaymentDto]),
    __metadata("design:returntype", void 0)
], TeacherPaymentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeacherPaymentController.prototype, "remove", null);
exports.TeacherPaymentController = TeacherPaymentController = __decorate([
    (0, common_1.Controller)('teacher-payment'),
    __metadata("design:paramtypes", [teacher_payment_service_1.TeacherPaymentService])
], TeacherPaymentController);
//# sourceMappingURL=teacher-payment.controller.js.map