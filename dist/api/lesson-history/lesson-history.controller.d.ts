import { LessonHistoryService } from './lesson-history.service';
export declare class LessonHistoryController {
    private readonly lessonHistoryService;
    constructor(lessonHistoryService: LessonHistoryService);
    findAll(): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    findOne(id: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    remove(id: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
}
