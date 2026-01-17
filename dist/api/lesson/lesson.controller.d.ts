import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import type { IToken } from 'src/infrastructure/token/interface';
import { LessonComplete } from './dto/lesson-complete.dto';
import { LessonFiltersDto } from './dto/lesson-filter.dto';
export declare class LessonController {
    private readonly lessonService;
    constructor(lessonService: LessonService);
    findAll(): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    findAllForTeacher(user: IToken, date?: string): Promise<{
        statusCode: number;
        data: import("../../core/entity/lesson.entity").Lesson[];
    }>;
    create(createLessonDto: CreateLessonDto, user: IToken): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    lessonComplete(teacher: IToken, dto: LessonComplete, lessonId: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    getAvailableLessons(): Promise<import("../../core/entity/lesson.entity").Lesson[]>;
    lessonStats(user: IToken): Promise<{
        totalLessons: number;
        bookedLessons: number;
        totalPages: number;
        currentPage: number;
    }>;
    getTeacherLessonsAdmin(teacherId: string, query: LessonFiltersDto): Promise<{
        statusCode: number;
        message: {
            uz: string;
            en: string;
            ru: string;
        };
        data: import("../../core/entity/lesson.entity").Lesson[];
        currentPage: number;
        totalPages: number;
        totalElements: number;
        pageSize: number;
        from: number;
        to: number;
    }>;
    getMyLessons(user: IToken): Promise<import("../../core/entity/lesson.entity").Lesson[]>;
    bookLesson(id: string, user: IToken): Promise<import("../../core/entity/lesson.entity").Lesson>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<import("../../core/entity/lesson.entity").Lesson>;
    delete(id: string): Promise<void>;
}
