import { Router } from 'express';
import productsRoutes from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/users', usersRouter);

routes.get('/', (request, response) => {
  return response.json({ Message: 'Funcionando' });
});

export default routes;
