import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesRepository extends Repository<Address> {
  constructor(
    @InjectRepository(Address)
    private readonly addressesRepository: Repository<Address>,
  ) {
    super(
      addressesRepository.target,
      addressesRepository.manager,
      addressesRepository.queryRunner,
    );
  }

  findAll(): Promise<Address[]> {
    return this.addressesRepository.find();
  }

  findById(id: string): Promise<Address> {
    return this.addressesRepository.findOne({ where: { id } });
  }
}
