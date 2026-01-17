"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTeacherPaymentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_teacher_payment_dto_1 = require("./create-teacher-payment.dto");
class UpdateTeacherPaymentDto extends (0, mapped_types_1.PartialType)(create_teacher_payment_dto_1.CreateTeacherPaymentDto) {
}
exports.UpdateTeacherPaymentDto = UpdateTeacherPaymentDto;
//# sourceMappingURL=update-teacher-payment.dto.js.map