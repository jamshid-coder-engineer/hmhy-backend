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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTeacherDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const index_enum_1 = require("../../../common/enum/index.enum");
class UpdateTeacherDto {
    phoneNumber;
    fullName;
    cardNumber;
    specification;
    level;
    description;
    hourPrice;
    portfolioLink;
    experience;
}
exports.UpdateTeacherDto = UpdateTeacherDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Teacher phone number in international format',
        example: '+998901234567',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\+?[1-9]\d{1,14}$/, {
        message: 'Phone number must be valid international format',
    }),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Full name of the teacher',
        example: 'John Doe',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Card number (16 digits)',
        example: '1234567812345678',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{16}$/, { message: 'Card number must be 16 digits' }),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "cardNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Teacher specification / subject',
        enum: index_enum_1.TeacherSpecification,
        example: index_enum_1.TeacherSpecification.DEUTSCH,
    }),
    (0, class_validator_1.IsEnum)(index_enum_1.TeacherSpecification),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "specification", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Teacher level or rank',
        example: 'Senior',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Description about the teacher',
        example: 'Experienced math teacher with 10 years of practice',
        maxLength: 1000,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Hourly price in USD',
        example: 50,
        minimum: 0,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateTeacherDto.prototype, "hourPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Portfolio link or website',
        example: 'https://github.com/suhrobswe',
        maxLength: 500,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "portfolioLink", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Experience description',
        example: '10 years teaching experience in high school',
        maxLength: 500,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "experience", void 0);
//# sourceMappingURL=update-teacher.dto.js.map