import {
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { BaseService } from 'src/infrastructure/base/base-service';
import { Admin } from 'src/core/entity/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { AdminRepository } from 'src/core/repository/admin.repository';
import { Roles } from 'src/common/enum/index.enum';
import { CryptoService } from 'src/infrastructure/crypto/crypto.service';
import { config } from 'src/config';
import { successRes } from 'src/infrastructure/response/success.response';
import { ISuccess } from 'src/infrastructure/pagination/successResponse';
import type { LessonRepository } from 'src/core/repository/lesson.repository';
import type { TeacherRepository } from 'src/core/repository/teacher.repository';
import { Student } from 'src/core/entity/student.entity';
import { Lesson } from 'src/core/entity/lesson.entity';
import { Teacher } from 'src/core/entity/teacher.entity';
import type { TeacherPaymentRepository } from 'src/core/repository/teacherPayment.repository';
import { TeacherPayment } from 'src/core/entity/teacherPayment.entity';
import type { StudentRepository } from 'src/core/repository/student.repository';

@Injectable()
export class AdminService
  extends BaseService<CreateAdminDto, UpdateAdminDto, Admin>
  implements OnModuleInit {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: AdminRepository,
    @InjectRepository(Student) private readonly studentRepo: StudentRepository,
    @InjectRepository(Lesson) private readonly lessonRepo: LessonRepository,
    @InjectRepository(Teacher) private readonly teacherRepo: TeacherRepository,
    @InjectRepository(TeacherPayment) private readonly paymentRepo: TeacherPaymentRepository,

    private readonly crypto: CryptoService,
  ) {
    super(adminRepo);
  }

  async onModuleInit() {
    const existsSuperAdmin = await this.adminRepo.findOne({
      where: { role: Roles.SUPER_ADMIN },
    });

    if (!existsSuperAdmin) {
      const hashPassword = await this.crypto.encrypt(
        config.SUPERADMIN.SUPERADMIN_PASSWORD,
      );

      const superAdmin = this.adminRepo.create({
        password: hashPassword,
        role: Roles.SUPER_ADMIN,
        username: config.SUPERADMIN.SUPERADMIN_USERNAME,
        phoneNumber: config.SUPERADMIN.SUPER_ADMIN_PHONE_NUMBER,
      });

      await this.adminRepo.save(superAdmin);
      console.log(`Super Admin created`);
    }
  }

  async getStats() {
    const [totalStudents, totalTeachers, totalLessons] = await Promise.all([
      this.studentRepo.count(),
      this.teacherRepo.count({ where: { isDelete: false } }),
      this.lessonRepo.count(),
    ]);

    // Umumiy tushumni hisoblash
    const payments = await this.paymentRepo.find();
    const totalRevenue = payments.reduce((sum, p) => sum + (p.platformAmount || 0), 0);

    const datas = {
      totalStudents,
      totalTeachers,
      totalLessons,
      totalRevenue,
      charts: {
        lessonsByStatus: [],
      }
    };

    return successRes(datas)
  }

  async createAdmin(dto: CreateAdminDto): Promise<ISuccess> {
    const { phoneNumber, username, password } = dto;
    const existsUsername = await this.adminRepo.findOne({
      where: { username },
    });

    if (existsUsername) throw new ConflictException('Username already exists!');

    const existsPhoneNumber = await this.adminRepo.findOne({
      where: { phoneNumber },
    });
    if (existsPhoneNumber)
      throw new ConflictException('Phone number already exists');

    const hashPassword = await this.crypto.encrypt(password);
    const admin = this.adminRepo.create({
      password: hashPassword,
      phoneNumber,
      username,
    });

    await this.adminRepo.save(admin);

    return successRes(admin, 201);
  }

  async updateAdmin(dto: UpdateAdminDto, id: string): Promise<ISuccess> {
    const { username, phoneNumber, password } = dto;

    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException('Admin not found');

    if (username) {
      const existsUsername = await this.adminRepo.findOne({
        where: { username },
      });
      if (existsUsername && existsUsername.id === id)
        throw new ConflictException('Username already exists');
    }

    if (phoneNumber) {
      const existsPhoneNumber = await this.adminRepo.findOne({
        where: { phoneNumber },
      });
      if (existsPhoneNumber && existsPhoneNumber.id !== id)
        throw new ConflictException('Phone number already exists');
    }
    let hashPassword: string = '';
    if (password) {
      hashPassword = await this.crypto.encrypt(password);
      dto.password = hashPassword;
    }

    const updatetAdmin = await this.adminRepo.update(id, dto);

    return successRes(updatetAdmin);
  }
}
