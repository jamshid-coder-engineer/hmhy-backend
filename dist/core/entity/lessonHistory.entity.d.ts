import { BaseEntity } from './base.entity';
import { Rating } from 'src/common/enum/index.enum';
import { Student } from './student.entity';
export declare class LessonHistory extends BaseEntity {
    lessonId: string;
    star: Rating;
    feedback: string;
    teacherId: string;
    studentId: string;
    student: Student;
}
