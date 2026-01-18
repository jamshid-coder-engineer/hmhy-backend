import { CreateLessonHistoryDto } from './dto/create-lesson-history.dto';
import { UpdateLessonHistoryDto } from './dto/update-lesson-history.dto';
import { BaseService } from 'src/infrastructure/base/base-service';
import { ISuccess } from 'src/infrastructure/pagination/successResponse';
import { LessonHistory } from 'src/core/entity/lessonHistory.entity';
import type { LessonHistoryRepository } from 'src/core/repository/lessonHistory.repository';
export declare class LessonHistoryService extends BaseService<CreateLessonHistoryDto, UpdateLessonHistoryDto, LessonHistory> {
    private readonly lessonHistoryRepository;
    constructor(lessonHistoryRepository: LessonHistoryRepository);
    getStudentHistory(studentId: string): Promise<ISuccess>;
    getLessonHistory(lessonId: string): Promise<ISuccess>;
    getHistoryByDateRange(studentId: string, startDate: Date, endDate: Date): Promise<ISuccess>;
}
