import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Revenue } from './entities/revenue.entity';

@Injectable()
export class RevenuesRepository extends Repository<Revenue> {
  constructor(
    @InjectRepository(Revenue)
    private readonly revenuesRepository: Repository<Revenue>,
  ) {
    super(
      revenuesRepository.target,
      revenuesRepository.manager,
      revenuesRepository.queryRunner,
    );
  }

  findAll(): Promise<Revenue[]> {
    return this.revenuesRepository.find();
  }
}
