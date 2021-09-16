import MessageError from '@shared/errors/MessageError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface RequestProfile {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: RequestProfile): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new MessageError('Customer not found');
    }

    const customerExists = await customerRepository.findByEmail(email);

    if (customerExists && id !== customerExists.id) {
      throw new MessageError('There is already one customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
