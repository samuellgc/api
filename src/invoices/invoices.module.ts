import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoicesRepository } from './invoices.repository';
import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/users/entities/users.entity';
import { Revenue } from 'src/revenues/entities/revenue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Client, User, Revenue])],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoicesRepository],
  exports: [InvoicesService, InvoicesRepository],
})
export class InvoicesModule {}
