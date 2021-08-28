import { Router } from 'express';
import productsRoutes from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionRouter from '@modules/users/routes/session.routes';
import passwordRouter from '@modules/users/routes/password.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);

routes.get('/', (request, response) => {
  return response.json({ Message: 'Funcionando' });
});

export default routes;
