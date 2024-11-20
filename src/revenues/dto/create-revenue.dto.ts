import { IsNotEmpty, IsNumber, IsDate, IsString } from 'class-validator';

export class CreateRevenueDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsDate()
  payment_date: Date;

  @IsNotEmpty()
  @IsString()
  status: string;
}
