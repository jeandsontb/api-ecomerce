import MessageError from '@shared/errors/MessageError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

type RequestProduct = {
  id: string;
};

class ShowOneProductService {
  public async execute({ id }: RequestProduct): Promise<Product | undefined> {
    const productRepository = getCustomRepository(ProductRepository);

    const productExist = await productRepository.findOne(id);

    if (!productExist) {
      throw new MessageError('Do not found product');
    }

    return productExist;
  }
}

export default ShowOneProductService;
