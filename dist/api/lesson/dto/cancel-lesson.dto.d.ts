import { LessonStatus } from 'src/common/enum/index.enum';
export declare class CancelLessonDto {
    status: LessonStatus.CANCELLED;
    reason?: string;
}
