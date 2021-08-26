import MessageError from '@shared/errors/MessageError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

type RequestProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: RequestProduct): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const productExist = await productRepository.findOne(id);

    if (!productExist) {
      throw new MessageError('Product not found');
    }

    const ProductNameExist = await productRepository.findByName(name);

    if (ProductNameExist) {
      throw new MessageError('There is already one product with this name');
    }

    productExist.name = name;
    productExist.price = price;
    productExist.quantity = quantity;

    await productRepository.save(productExist);

    return productExist;
  }
}

export default UpdateProductService;
