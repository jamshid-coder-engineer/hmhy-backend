import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Lesson } from '../../core/entity/lesson.entity';
export declare class NotificationService implements OnModuleInit {
    private readonly lessonRepo;
    private bot;
    private readonly logger;
    constructor(lessonRepo: Repository<Lesson>);
    onModuleInit(): Promise<void>;
    handleLessonReminders(): Promise<void>;
    private sendTelegramReminder;
}
