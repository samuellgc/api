import { Injectable, NotFoundException } from '@nestjs/common';
import { RevenuesRepository } from './revenues.repository';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';

@Injectable()
export class RevenuesService {
  constructor(private readonly revenuesRepository: RevenuesRepository) {}

  create(createRevenueDto: CreateRevenueDto) {
    return this.revenuesRepository.save(createRevenueDto);
  }

  findAll() {
    return this.revenuesRepository.findAll();
  }

  async findOne(id: string) {
    const revenue = await this.revenuesRepository.findOne({ where: { id } });
    if (!revenue) {
      throw new NotFoundException('Revenue not found');
    }
    return revenue;
  }

  async update(id: string, updateRevenueDto: UpdateRevenueDto) {
    const revenue = await this.revenuesRepository.update(id, updateRevenueDto);
    if (!revenue) {
      throw new NotFoundException('Revenue not found');
    }

    const updated = await this.revenuesRepository.findOne({
      where: { id },
    });

    return updated;
  }

  async getRevenueByPeriod(
    startDate: string,
    endDate: string,
  ): Promise<number> {
    const totalRevenue = await this.revenuesRepository
      .createQueryBuilder('revenue')
      .select('SUM(revenue.amount)', 'total')
      .where('revenue.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawOne();

    return totalRevenue.total || 0;
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    return this.revenuesRepository.softRemove(found);
  }
}
