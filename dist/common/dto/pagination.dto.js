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
exports.PaginationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const index_enum_1 = require("../enum/index.enum");
class PaginationDto {
    query;
    search;
    page = 1;
    limit = 10;
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        example: 'John',
        description: "Qidiruv so'zi (search query)",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PaginationDto.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        example: 'fullName',
        description: 'Qaysi fieldda qidirish kerak',
        enum: index_enum_1.SearchFieldEnum,
    }),
    (0, class_validator_1.IsEnum)(index_enum_1.SearchFieldEnum, {
        message: "search maydoni fullName, email, specification yoki description bo'lishi kerak",
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PaginationDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        example: 1,
        description: 'Sahifa raqami (1 dan boshlanadi)',
        default: 1,
    }),
    (0, class_validator_1.IsNumber)({}, { message: "page raqam bo'lishi kerak" }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(1, { message: "page kamida 1 bo'lishi kerak" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        example: 10,
        description: 'Har bir sahifada nechta element',
        default: 10,
    }),
    (0, class_validator_1.IsNumber)({}, { message: "limit raqam bo'lishi kerak" }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(1, { message: "limit kamida 1 bo'lishi kerak" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "limit", void 0);
//# sourceMappingURL=pagination.dto.js.map