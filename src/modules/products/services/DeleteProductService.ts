import MessageError from '@shared/errors/MessageError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

type RequestProduct = {
  id: string;
};

class DeleteProductService {
  public async execute({ id }: RequestProduct): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExist = await productRepository.findOne(id);

    if (!productExist) {
      throw new MessageError('Product not found');
    }

    await productRepository.remove(productExist);
  }
}

export default DeleteProductService;
