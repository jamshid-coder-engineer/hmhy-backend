import { LessonStatus } from 'src/common/enum/index.enum';
export declare class CreateLessonDto {
    name: string;
    startTime: string;
    endTime: string;
    price: number;
    status?: LessonStatus;
    isPaid?: boolean;
}
