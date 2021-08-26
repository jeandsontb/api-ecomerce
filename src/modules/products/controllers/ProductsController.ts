import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowOneProductService from '../services/ShowOneProductService';
import UpdateProductService from '../services/UpdateProductService';

class ProductsController {
  //Método para listar produtos
  public async index(request: Request, response: Response): Promise<Response> {
    const getProducts = new ListProductService();

    const products = await getProducts.execute();

    return response.json(products);
  }

  //Método para listar um único produto
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productVerify = new ShowOneProductService();

    const product = await productVerify.execute({ id });

    return response.json(product);
  }

  //Método para adicionar um produto
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({ name, price, quantity });

    return response.json(product);
  }

  //Método para atualizar um produto
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({ id, name, price, quantity });

    return response.json(product);
  }

  //Método para excluir um produto
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeProduct = new DeleteProductService();

    await removeProduct.execute({ id });

    return response.json({ status: '' });
  }
}

export default ProductsController;
