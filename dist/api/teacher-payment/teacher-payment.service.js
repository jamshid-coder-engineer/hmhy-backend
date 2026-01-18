"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherPaymentService = void 0;
const common_1 = require("@nestjs/common");
let TeacherPaymentService = class TeacherPaymentService {
    create(createTeacherPaymentDto) {
        return 'This action adds a new teacherPayment';
    }
    findAll() {
        return `This action returns all teacherPayment`;
    }
    findOne(id) {
        return `This action returns a #${id} teacherPayment`;
    }
    update(id, updateTeacherPaymentDto) {
        return `This action updates a #${id} teacherPayment`;
    }
    remove(id) {
        return `This action removes a #${id} teacherPayment`;
    }
};
exports.TeacherPaymentService = TeacherPaymentService;
exports.TeacherPaymentService = TeacherPaymentService = __decorate([
    (0, common_1.Injectable)()
], TeacherPaymentService);
//# sourceMappingURL=teacher-payment.service.js.map