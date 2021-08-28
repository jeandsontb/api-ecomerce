import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import MessageError from '@shared/errors/MessageError';
import Product from '../typeorm/entities/Product';

type RequestProduct = {
  name: string;
  price: number;
  quantity: number;
};

class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: RequestProduct): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const findNameExists = await productRepository.findByName(name);

    if (findNameExists) {
      throw new MessageError('There is already one product with this name');
    }

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
