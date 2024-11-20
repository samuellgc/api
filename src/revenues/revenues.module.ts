import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revenue } from './entities/revenue.entity';
import { RevenuesService } from './revenues.service';
import { RevenuesController } from './revenues.controller';
import { RevenuesRepository } from './revenues.repository';
import { User } from 'src/users/entities/users.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Revenue, User, Appointment])],
  controllers: [RevenuesController],
  providers: [RevenuesService, RevenuesRepository],
  exports: [RevenuesService, RevenuesRepository],
})
export class RevenuesModule {}
