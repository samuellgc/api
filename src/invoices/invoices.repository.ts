import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoicesRepository extends Repository<Invoice> {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoicesRepository: Repository<Invoice>,
  ) {
    super(
      invoicesRepository.target,
      invoicesRepository.manager,
      invoicesRepository.queryRunner,
    );
  }

  findAll(): Promise<Invoice[]> {
    return this.invoicesRepository.find();
  }

  findById(id: string): Promise<Invoice> {
    return this.invoicesRepository.findOneBy({ id });
  }
}
