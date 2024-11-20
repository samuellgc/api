import { Client } from 'src/clients/entities/client.entity';
import { Revenue } from 'src/revenues/entities/revenue.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

export enum AppointmentStatus {
  PENDING = 0,
  COMPLETED = 1,
  CANCELLED = 2,
  RESCHEDULED = 3,
}

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @Column({ nullable: true })
  client_source: string;

  @Column('decimal', { nullable: true })
  advance_payment: number;

  @Column('decimal', { nullable: true })
  amount: number;

  @Column({ type: 'text', nullable: true })
  note: string;

  @ManyToOne(() => Client, (client) => client.appointments)
  client: Client;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @OneToMany(() => Revenue, (revenue) => revenue.appointment)
  revenues: Revenue[];
}
