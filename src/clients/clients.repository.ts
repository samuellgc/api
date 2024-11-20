import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsRepository extends Repository<Client> {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {
    super(
      clientsRepository.target,
      clientsRepository.manager,
      clientsRepository.queryRunner,
    );
  }

  findAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  findById(id: string): Promise<Client> {
    return this.clientsRepository.findOneBy({ id });
  }
}
