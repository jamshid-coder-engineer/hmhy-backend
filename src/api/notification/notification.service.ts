
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Telegraf } from 'telegraf';
import { Student } from '../../core/entity/student.entity'; 
import { Lesson } from '../../core/entity/lesson.entity';   
import { config } from 'src/config';

@Injectable()
export class NotificationService implements OnModuleInit {
  private bot: Telegraf;
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
  ) {}
async onModuleInit() {
  try {
    await this.bot.telegram.getMe()
    console.log(' Telegram bot initialized')
  } catch (error) {
    console.error(' Telegram bot init failed:', error.message)
  }
}


  @Cron(CronExpression. EVERY_MINUTE)
  async handleLessonReminders() {
    const now = new Date();
    
   
    const startWindow = new Date(now.getTime() - 5  * 60000);
    const endWindow = new Date(now.getTime() + 25 * 60000);

    
    try {
      const upcomingLessons = await this.lessonRepo.find({
        where: {
          startTime: Between(startWindow, endWindow),
        },
        relations: ['student'], 
      });


      if (upcomingLessons.length === 0) {
        
        const next2Hours = new Date(now.getTime() + 120 * 60000); 
        const allUpcoming = await this.lessonRepo.find({
          where: {
            startTime: Between(now, next2Hours), 
          },
          order: { startTime: 'ASC' },
          take: 3,
        });

        if (allUpcoming.length > 0) {
          allUpcoming.forEach(l => {
          });
        } else {
        }
      }

      for (const lesson of upcomingLessons) {
        const student = lesson.student;

        if (!student) {
          this.logger.warn(`⚠️ Dars ID: ${lesson.id} uchun student biriktirilmagan.`);
          continue;
        }

        await this.sendTelegramReminder(student, lesson);
      }

    } catch (error) {
    }
    
  }

  private async sendTelegramReminder(student: Student, lesson: Lesson) {
    if (!student.tgId) {
      this.logger.warn(`⚠️ Student (ID: ${student.id}) da Telegram ID yo'q.`);
      return;
    }

    const dateObj = new Date(lesson.startTime);
    const timeString = dateObj.toLocaleTimeString('uz-UZ', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Tashkent',
    });

    const message =
      `🔔 *Dars eslatmasi!*\n\n` +
      `📚 *Fan:* ${lesson.name || 'Dars'}\n` +
      `⏰ *Vaqt:* ${timeString}\n` +
      `📍 *Link:* ${lesson.googleMeetUrl || 'Onlayn'}\n\n` +
      `Iltimos, darsga kechikmasdan kiring!`;

    try {
      if (!this.bot) {
        return;
      }

      await this.bot.telegram.sendMessage(student.tgId, message, {
        parse_mode: 'Markdown',
      });
     
    } catch (error) {
     
    }
  }
}