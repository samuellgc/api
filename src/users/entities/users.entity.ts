import { Address } from 'src/addresses/entities/address.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Plan } from 'src/plan/entities/plan.entity';
import { Revenue } from 'src/revenues/entities/revenue.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  specialty: string;

  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];

  @OneToMany(() => Invoice, (invoice) => invoice.user)
  invoices: Invoice[];

  @OneToMany(() => Revenue, (revenue) => revenue.user)
  revenues: Revenue[];

  @Column({ default: 0 })
  messageCount: number;

  @ManyToOne(() => Plan)
  plan: Plan;

  @Column({ nullable: true })
  messageCountMonth: string;
}
