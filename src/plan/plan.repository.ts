import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';

@Injectable()
export class PlansRepository extends Repository<Plan> {
  constructor(
    @InjectRepository(Plan) private readonly plansRepository: Repository<Plan>,
  ) {
    super(
      plansRepository.target,
      plansRepository.manager,
      plansRepository.queryRunner,
    );
  }

  async findById(id: string): Promise<Plan> {
    return await this.plansRepository.findOne({ where: { id } });
  }

  findAll(): Promise<Plan[]> {
    return this.plansRepository.find();
  }
}
