import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendOtpDto {
  @ApiProperty({
    example: 'saribayevj1666@gmail.com',
    description: 'Google orqali kirgan email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqam' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/)
  phoneNumber: string;

  @ApiProperty({
    example: 'Password001!',
    description: 'Web sayt uchun yangi parol',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
