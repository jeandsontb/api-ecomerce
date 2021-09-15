import { getCustomRepository } from 'typeorm';
import MessageError from '@shared/errors/MessageError';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';

type RequestCustomer = {
  name: string;
  email: string;
};

class CreateCustomerService {
  public async execute({ name, email }: RequestCustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const emailExists = await customersRepository.findByEmail(email);
    if (emailExists) {
      throw new MessageError('Email address already used');
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
