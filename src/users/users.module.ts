import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { Address } from 'src/addresses/entities/address.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Revenue } from 'src/revenues/entities/revenue.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Address,
      Client,
      Appointment,
      Invoice,
      Revenue,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
