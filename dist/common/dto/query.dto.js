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
exports.QueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const index_enum_1 = require("../enum/index.enum");
class QueryDto {
    query;
    search;
}
exports.QueryDto = QueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        example: 'John',
        description: "Qidiruv so'zi",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryDto.prototype, "query", void 0);
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
], QueryDto.prototype, "search", void 0);
//# sourceMappingURL=query.dto.js.map