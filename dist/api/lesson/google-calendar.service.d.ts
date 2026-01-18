import type { Teacher } from 'src/core/entity/teacher.entity';
import { Repository } from 'typeorm';
import { Teacher as TeacherEntity } from 'src/core/entity/teacher.entity';
export declare class GoogleCalendarService {
    private readonly teacherRepo;
    constructor(teacherRepo: Repository<TeacherEntity>);
    private createOAuthClient;
    getClient(teacher: Teacher): Promise<import("googleapis").calendar_v3.Calendar>;
}
