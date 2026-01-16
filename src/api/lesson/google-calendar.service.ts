// import { google } from 'googleapis';
// import { ref } from 'process';
// import { config } from 'src/config';
// import { Teacher } from 'src/core/entity/teacher.entity';

// export class GoogleCalendarService {
//   getClient(teacher: Teacher) {
//     const oauth2Client = new google.auth.OAuth2(
//       config.GOOGLE_AUTH.GOOGLE_CLIENT_ID,
//       config.GOOGLE_AUTH.GOOGLE_CLIENT_SECRET,
//       config.GOOGLE_AUTH.GOOGLE_CALLBACK_URL,
//     );

//     oauth2Client.setCredentials({
//       access_token: teacher.googleAccessToken,
//       refresh_token: teacher.googleRefreshToken,
//     });
//     return google.calendar({
//       version: 'v3',
//       auth: oauth2Client,
//     });
//   }
// }



import { BadRequestException, Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { config } from 'src/config';
import type { Teacher } from 'src/core/entity/teacher.entity';

@Injectable()
export class GoogleCalendarService {
  private createOAuthClient(): OAuth2Client {
    return new google.auth.OAuth2(
      config.GOOGLE_AUTH.GOOGLE_CLIENT_ID,
      config.GOOGLE_AUTH.GOOGLE_CLIENT_SECRET,
      config.GOOGLE_AUTH.GOOGLE_CALLBACK_URL,
    );
  }

  async getClient(teacher: Teacher) {
    if (!teacher.googleRefreshToken) {
      throw new BadRequestException(
        "Google Calendar qayta ulangan bo‘lishi kerak (refresh token yo‘q).",
      );
    }

    const oauth2Client = this.createOAuthClient();

    oauth2Client.setCredentials({
      access_token: teacher.googleAccessToken || undefined,
      refresh_token: teacher.googleRefreshToken || undefined,
    });

    // Access token eskirgan bo‘lsa yangilab beradi
    try {
      const { token } = await oauth2Client.getAccessToken();
      if (token && token !== teacher.googleAccessToken) {
        // ixtiyoriy: DB ga ham yangilab qo‘ying (tavsiya)
        teacher.googleAccessToken = token;
      }
    } catch (e: any) {
      throw new BadRequestException(
        "Google token yaroqsiz. Iltimos, Google’ni qayta ulang.",
      );
    }

    return google.calendar({ version: 'v3', auth: oauth2Client });
  }
}
