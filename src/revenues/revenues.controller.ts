import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { RevenuesService } from './revenues.service';
import { Revenue } from './entities/revenue.entity';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';

@Controller('revenues')
export class RevenuesController {
  constructor(private readonly revenuesService: RevenuesService) {}

  @Post()
  create(@Body() createRevenueDto: CreateRevenueDto): Promise<Revenue> {
    return this.revenuesService.create(createRevenueDto);
  }

  @Get()
  findAll(): Promise<Revenue[]> {
    return this.revenuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Revenue> {
    return this.revenuesService.findOne(id);
  }

  @Get('revenue')
  async getRevenue(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<number> {
    return this.revenuesService.getRevenueByPeriod(startDate, endDate);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRevenueDto: UpdateRevenueDto,
  ): Promise<Revenue> {
    return this.revenuesService.update(id, updateRevenueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Revenue> {
    return this.revenuesService.remove(id);
  }
}
