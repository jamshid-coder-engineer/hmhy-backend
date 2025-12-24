import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TeacherPaymentService } from './teacher-payment.service';
import { CreateTeacherPaymentDto } from './dto/create-teacher-payment.dto';
import { UpdateTeacherPaymentDto } from './dto/update-teacher-payment.dto';

@Controller('teacher-payment')
export class TeacherPaymentController {
  constructor(private readonly teacherPaymentService: TeacherPaymentService) {}

  @Post()
  create(@Body() createTeacherPaymentDto: CreateTeacherPaymentDto) {
    return this.teacherPaymentService.create(createTeacherPaymentDto);
  }

  @Get()
  findAll() {
    return this.teacherPaymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.teacherPaymentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTeacherPaymentDto: UpdateTeacherPaymentDto,
  ) {
    return this.teacherPaymentService.update(+id, updateTeacherPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.teacherPaymentService.remove(+id);
  }
}
