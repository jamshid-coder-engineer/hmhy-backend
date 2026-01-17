import type { Teacher } from 'src/core/entity/teacher.entity';
export declare class GoogleCalendarService {
    private createOAuthClient;
    getClient(teacher: Teacher): Promise<import("googleapis").calendar_v3.Calendar>;
}
