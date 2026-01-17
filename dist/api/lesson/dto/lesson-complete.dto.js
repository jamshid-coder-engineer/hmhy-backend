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
exports.LessonComplete = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const index_enum_1 = require("../../../common/enum/index.enum");
class LessonComplete {
    status;
    star;
    feedback;
}
exports.LessonComplete = LessonComplete;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lesson status',
        example: index_enum_1.LessonStatus.COMPLETED,
        enum: index_enum_1.LessonStatus,
    }),
    (0, class_validator_1.IsEnum)(index_enum_1.LessonStatus),
    (0, class_transformer_1.Transform)(({ value }) => value?.toString().toUpperCase()),
    __metadata("design:type", String)
], LessonComplete.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Rating for the lesson',
        example: index_enum_1.Rating.FIVE,
        enum: index_enum_1.Rating,
        default: index_enum_1.Rating.FIVE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(index_enum_1.Rating),
    (0, class_transformer_1.Transform)(({ value }) => value?.toString().toUpperCase()),
    __metadata("design:type", String)
], LessonComplete.prototype, "star", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Feedback for the lesson',
        example: 'Great lesson, student showed excellent progress',
        maxLength: 500,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LessonComplete.prototype, "feedback", void 0);
//# sourceMappingURL=lesson-complete.dto.js.map