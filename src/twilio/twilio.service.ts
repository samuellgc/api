import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  private twilioClient: Twilio;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async sendWhatsAppMessage(
    userId: string,
    to: string,
    date: string,
    hour: string,
  ): Promise<void> {
    const from = `whatsapp:${this.configService.get<string>('TWILIO_WHATSAPP_NUMBER')}`;
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['plan'],
    });

    const currentMonth = new Date().toISOString().slice(0, 7);

    if (user.messageCountMonth !== currentMonth) {
      user.messageCount = 0;
      user.messageCountMonth = currentMonth;
    }

    const messageLimit = user.plan.messageLimit;

    if (messageLimit !== null && user.messageCount >= messageLimit) {
      throw new Error(
        'Limite de mensagens atingido para o mês de acordo com o seu plano.',
      );
    }

    try {
      await this.twilioClient.messages.create({
        from,
        to: `whatsapp:${to}`,
        contentSid: 'HX335e6decddf2e79585c8aa38d540e554',
        contentVariables: JSON.stringify({ 1: date, 2: hour, 3: user.name }),
      });
      user.messageCount += 1;
      await this.userRepository.save(user);
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw new Error('Failed to send WhatsApp message');
    }
  }

  async confirmAppointment(phone: string) {
    console.log(`Consulta confirmada para o cliente com o número ${phone}`);
  }

  async cancelAppointment(phone: string) {
    console.log(`Consulta cancelada para o cliente com o número ${phone}`);
  }
}
