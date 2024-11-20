import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Revenue } from 'src/revenues/entities/revenue.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('decimal')
  amount: number;

  @Column()
  issued_date: Date;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.invoices)
  user: User;

  @ManyToOne(() => Client, (client) => client.invoices)
  client: Client;

  @OneToOne(() => Revenue)
  @JoinColumn()
  revenue: Revenue;
}
