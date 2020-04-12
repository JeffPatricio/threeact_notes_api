import express, { Router } from 'express';
import UserController from './controllers/UserController';
import ActivationAccountController from './controllers/ActivationAccountController';
import LoginController from './controllers/LoginController';
import { requestLog } from './utils';
import path from 'path'

const routes = express.Router()

routes.use('/public', express.static('public'));
routes.use(requestLog);

// Rotas sem autenticação 
routes.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'status', 'status.html')));

routes.post('/users', UserController.create);

routes.get('/account/:token', ActivationAccountController.create);

// Rotas com autenticação
routes.get('/users/:userId', UserController.read);

routes.get('/listTest', UserController.listTest);

routes.post('/login', LoginController.login);

export default routes;