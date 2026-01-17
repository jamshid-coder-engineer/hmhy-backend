import { Rating, LessonStatus } from 'src/common/enum/index.enum';
export declare class LessonComplete {
    status: LessonStatus;
    star?: Rating;
    feedback?: string;
}
