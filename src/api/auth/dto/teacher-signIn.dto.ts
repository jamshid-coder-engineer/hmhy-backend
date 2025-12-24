import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TeacherSignInDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'saribayevj1666@gmail.com', description: 'Teacher email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Password001!', description: 'Teacher password' })
  password: string;
}
