import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressesRepository } from './addresses.repository';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressesRepository: AddressesRepository,
  ) {}

  create(createAddressDto: CreateAddressDto) {
    const address = this.addressesRepository.create(createAddressDto);
    return this.addressesRepository.save(address);
  }

  findAll() {
    return this.addressesRepository.findAll();
  }

  async findOne(id: string) {
    const address = await this.addressesRepository.findById(id);
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    await this.addressesRepository.update(id, updateAddressDto);
    const address = await this.addressesRepository.findById(id);
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async remove(id: string) {
    const address = await this.addressesRepository.findById(id);
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return this.addressesRepository.remove(address);
  }
}
