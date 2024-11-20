import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsRepository extends Repository<Appointment> {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {
    super(
      appointmentRepository.target,
      appointmentRepository.manager,
      appointmentRepository.queryRunner,
    );
  }

  findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  findById(id: string): Promise<Appointment> {
    return this.appointmentRepository.findOne({ where: { id } });
  }
}
