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
exports.CreateNotificationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const index_enum_1 = require("../../../common/enum/index.enum");
class CreateNotificationDto {
    studentId;
    type;
    title;
    message;
    channel;
    sendAt;
    metadata;
}
exports.CreateNotificationDto = CreateNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student ID' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: index_enum_1.NotificationType,
        description: 'Notification type',
        example: index_enum_1.NotificationType.LESSON_REMINDER,
    }),
    (0, class_validator_1.IsEnum)(index_enum_1.NotificationType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notification title',
        example: 'Lesson Reminder',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notification message',
        example: 'Your lesson starts in 30 minutes',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: index_enum_1.NotificationChannel,
        description: 'Notification channel',
        example: index_enum_1.NotificationChannel.TELEGRAM,
        default: index_enum_1.NotificationChannel.IN_APP,
    }),
    (0, class_validator_1.IsEnum)(index_enum_1.NotificationChannel),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "channel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Scheduled send time (optional)',
        required: false,
        example: '2024-12-20T10:00:00Z',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "sendAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Extra metadata (lessonId, transactionId, etc.)',
        required: false,
        example: { lessonId: 'uuid', transactionId: 'uuid' },
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateNotificationDto.prototype, "metadata", void 0);
//# sourceMappingURL=create-notification.dto.js.map