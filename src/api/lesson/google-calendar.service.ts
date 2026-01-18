import { BadRequestException, Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { config } from 'src/config';
import type { Teacher } from 'src/core/entity/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher as TeacherEntity } from 'src/core/entity/teacher.entity';

@Injectable()
export class GoogleCalendarService {
  constructor(
    @InjectRepository(TeacherEntity)
    private readonly teacherRepo: Repository<TeacherEntity>,
  ) {}

  private createOAuthClient(): OAuth2Client {
    return new google.auth.OAuth2(
      config.GOOGLE_AUTH.GOOGLE_CLIENT_ID,
      config.GOOGLE_AUTH.GOOGLE_CLIENT_SECRET,
      config.GOOGLE_AUTH.GOOGLE_CALLBACK_URL,
    );
  }

  async getClient(teacher: Teacher) {
    const oauth2Client = this.createOAuthClient();
    
    if (!teacher.googleRefreshToken) {
       console.error("Refresh token topilmadi! Bazadagi holat:", teacher);
       throw new BadRequestException("Google bilan qayta bog'laning (Refresh token yo'q)");
    }


    oauth2Client.setCredentials({
      access_token: teacher.googleAccessToken || undefined,
      refresh_token: teacher.googleRefreshToken || undefined,
    });

    oauth2Client.on('tokens', async (tokens) => {
      let changed = false;

      if (tokens.access_token && tokens.access_token !== teacher.googleAccessToken) {
        teacher.googleAccessToken = tokens.access_token;
        changed = true;
      }

      if (tokens.refresh_token && tokens.refresh_token !== teacher.googleRefreshToken) {
        teacher.googleRefreshToken = tokens.refresh_token;
        changed = true;
      }

      if (changed) {
        await this.teacherRepo.save(teacher);
      }
    });

    try {
      await oauth2Client.getAccessToken();
    } catch {
      throw new BadRequestException(
        "Google token yaroqsiz. Iltimos, Google’ni qayta ulang.",
      );
    }

    return google.calendar({ version: 'v3', auth: oauth2Client });
  }
}
