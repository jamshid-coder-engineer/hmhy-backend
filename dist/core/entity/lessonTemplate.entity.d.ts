import { Teacher } from './teacher.entity';
import { BaseEntity } from './base.entity';
export declare class LessonTemplate extends BaseEntity {
    teacher: string;
    teacherRelation: Teacher;
    name: string;
    timeSlot: string[];
}
