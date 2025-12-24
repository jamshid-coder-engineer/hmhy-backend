import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminSignInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'jamshid', description: 'Admin username' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'jamshid000!', description: 'Admin password' })
  password: string;
}
