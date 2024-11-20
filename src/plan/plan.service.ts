import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { PlansRepository } from './plan.repository';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: PlansRepository,
  ) {}

  findAll(): Promise<Plan[]> {
    return this.planRepository.find();
  }
}
