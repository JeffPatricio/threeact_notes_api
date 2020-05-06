import express from 'express';
import UserController from './controllers/UserController';
import ActivationAccountController from './controllers/ActivationAccountController';
import SessionController from './controllers/SessionController';
import ForgotPasswordController from './controllers/ForgotPasswordController';
import { requestLog } from './utils';
import path from 'path';

const routes = express.Router();

routes.use('/public', express.static('public'));
routes.use(requestLog);

// Rotas sem autenticação 
routes.get('/', (_, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'status', 'status.html')));
routes.get('/favicon.ico', (_, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'favicon.ico')));
routes.get('/account/:token', ActivationAccountController.create);
routes.post('/users', UserController.create);
routes.post('/session', SessionController.create);
routes.post('/forgotPassword', ForgotPasswordController.create);
routes.get('/forgotPassword/:token/:emailHash', ForgotPasswordController.read);
routes.put('/forgotPassword', ForgotPasswordController.update);

// Rotas com autenticação
routes.get('/users/:userId', UserController.read);

export default routes