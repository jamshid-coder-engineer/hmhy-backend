import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { BaseService } from 'src/infrastructure/base/base-service';
import { Lesson } from 'src/core/entity/lesson.entity';
import { GoogleCalendarService } from './google-calendar.service';
import type { LessonRepository } from 'src/core/repository/lesson.repository';
import type { TeacherRepository } from 'src/core/repository/teacher.repository';
import type { StudentRepository } from 'src/core/repository/student.repository';
import { LessonComplete } from './dto/lesson-complete.dto';
import type { LessonHistoryRepository } from 'src/core/repository/lessonHistory.repository';
import { LessonFiltersDto } from './dto/lesson-filter.dto';
import { ISuccess } from 'src/infrastructure/pagination/successResponse';
export declare class LessonService extends BaseService<CreateLessonDto, UpdateLessonDto, Lesson> {
    private readonly lessonRepo;
    private readonly teacherRepo;
    private readonly studentRepo;
    private readonly calendarService;
    private readonly lessonHistoryRepo;
    constructor(lessonRepo: LessonRepository, teacherRepo: TeacherRepository, studentRepo: StudentRepository, calendarService: GoogleCalendarService, lessonHistoryRepo: LessonHistoryRepository);
    createLesson(dto: CreateLessonDto, teacherId: string): Promise<ISuccess>;
    getTeacherLessonsByDate(teacherId: string, date?: string): Promise<{
        statusCode: number;
        data: Lesson[];
    }>;
    lessonComplete(teacherId: string, dto: LessonComplete, lessonId: string): Promise<ISuccess>;
    getTeacherLessonsForAdmin(teacherId: string, filters: LessonFiltersDto): Promise<{
        statusCode: number;
        message: {
            uz: string;
            en: string;
            ru: string;
        };
        data: Lesson[];
        currentPage: number;
        totalPages: number;
        totalElements: number;
        pageSize: number;
        from: number;
        to: number;
    }>;
    lessonStats(id: string): Promise<{
        totalLessons: number;
        bookedLessons: number;
        totalPages: number;
        currentPage: number;
    }>;
    bookLesson(lessonId: string, studentId: string): Promise<Lesson>;
    updateLesson(id: string, dto: UpdateLessonDto): Promise<Lesson>;
    deleteLesson(id: string): Promise<void>;
    getAvailableLessons(): Promise<Lesson[]>;
    getMyLessons(studentId: string): Promise<Lesson[]>;
    getTeacherLessons(teacherId: string): Promise<Lesson[]>;
}
