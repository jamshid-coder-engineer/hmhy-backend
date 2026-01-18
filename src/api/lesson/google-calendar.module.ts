import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/core/entity/teacher.entity';
import { GoogleCalendarService } from './google-calendar.service';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  providers: [GoogleCalendarService],
  exports: [GoogleCalendarService],
})
export class GoogleCalendarModule {}
