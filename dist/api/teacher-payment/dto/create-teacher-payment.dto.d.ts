export declare class CreateTeacherPaymentDto {
    teacher: string;
    lessons: string[];
    totalLessonAmount: number;
    platformComission: number;
    platformAmount: number;
    teacherAmount: number;
    notes?: string;
}
