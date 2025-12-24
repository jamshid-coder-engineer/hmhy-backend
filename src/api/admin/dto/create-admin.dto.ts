import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Roles } from 'src/common/enum/index.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ example: 'jamshid', description: 'Admin username' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  @ApiProperty({ example: 'jamshid000!', description: 'Admin password' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(13)
  @MaxLength(15)
  @ApiProperty({ example: '+998997001166', description: 'Admin phone number' })
  phoneNumber: string;

  @IsEnum(Roles)
  @IsOptional()
  role?: Roles;
}
