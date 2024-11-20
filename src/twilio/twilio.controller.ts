import { Controller, Post, Req } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { Request } from 'express';

@Controller('twilio')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('webhook')
  async receiveMessage(@Req() req: Request): Promise<void> {
    const { Body, From } = req.body;
    const messageBody = Body.toLowerCase();
    const clientPhone = From.replace('whatsapp:', '');

    if (messageBody.includes('sim')) {
      await this.twilioService.confirmAppointment(clientPhone);
    } else if (messageBody.includes('não')) {
      await this.twilioService.cancelAppointment(clientPhone);
    }
  }
}
