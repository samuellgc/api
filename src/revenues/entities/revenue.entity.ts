import { Appointment } from 'src/appointments/entities/appointment.entity';
import { User } from 'src/users/entities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('revenues')
export class Revenue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  amount: number;

  @Column()
  payment_date: Date;

  @Column()
  status: string;

  @ManyToOne(() => Appointment, (appointment) => appointment.id)
  appointment: Appointment;

  @ManyToOne(() => User, (user) => user.revenues)
  user: User;
}
