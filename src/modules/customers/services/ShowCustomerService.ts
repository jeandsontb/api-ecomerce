import MessageError from '@shared/errors/MessageError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface RequestProfile {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: RequestProfile): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new MessageError('Customer not found');
    }

    return customer;
  }
}

export default ShowCustomerService;
