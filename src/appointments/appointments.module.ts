import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsRepository } from './appointments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revenue } from 'src/revenues/entities/revenue.entity';
import { User } from 'src/users/entities/users.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Appointment } from './entities/appointment.entity';
import { TwilioService } from 'src/twilio/twilio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Client, User, Revenue])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentsRepository, TwilioService],
  exports: [AppointmentsService, AppointmentsRepository],
})
export class AppointmentsModule {}
