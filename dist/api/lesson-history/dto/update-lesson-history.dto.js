"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLessonHistoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_lesson_history_dto_1 = require("./create-lesson-history.dto");
class UpdateLessonHistoryDto extends (0, swagger_1.PartialType)(create_lesson_history_dto_1.CreateLessonHistoryDto) {
}
exports.UpdateLessonHistoryDto = UpdateLessonHistoryDto;
//# sourceMappingURL=update-lesson-history.dto.js.map