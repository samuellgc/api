import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentsRepository } from './appointments.repository';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { TwilioService } from 'src/twilio/twilio.service';
import { Appointment } from './entities/appointment.entity';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import {
  IUserDecorator,
  UserDecorator,
} from 'src/users/decorators/user.decorator';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly twilioService: TwilioService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  scheduleReminder(appointment: Appointment, userId: string) {
    const date = new Date(appointment.date);
    date.setDate(date.getDate() - 2);

    const job = new CronJob(date, async () => {
      await this.twilioService.sendWhatsAppMessage(
        userId,
        appointment.client.phone,
        appointment.date.toISOString(),
        appointment.time,
      );

      console.log(
        `Lembrete enviado para o cliente ${appointment.client.phone}`,
      );
    });

    this.schedulerRegistry.addCronJob(`reminder-${appointment.id}`, job);
    job.start();
  }

  async create(
    createAppointmentDto: CreateAppointmentDto,
    @UserDecorator() user: IUserDecorator,
  ): Promise<Appointment> {
    const appointment =
      this.appointmentsRepository.create(createAppointmentDto);

    const clientPhone = appointment.client.phone;
    await this.twilioService.sendWhatsAppMessage(
      user.id,
      clientPhone,
      appointment.date.toISOString(),
      appointment.time,
    );

    this.scheduleReminder(appointment, user.id);

    return appointment;
  }

  findAll() {
    return this.appointmentsRepository.findAll();
  }

  async findOne(id: string) {
    const appointment = await this.appointmentsRepository.findById(id);
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentsRepository.update(
      id,
      updateAppointmentDto,
    );
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    const updatedAppointment = await this.appointmentsRepository.findById(id);
    return updatedAppointment;
  }

  async remove(id: string) {
    const appointment = await this.appointmentsRepository.findById(id);
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return this.appointmentsRepository.softRemove(appointment);
  }
}
