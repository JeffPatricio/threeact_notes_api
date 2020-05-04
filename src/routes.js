import express from 'express';
import UserController from './controllers/UserController';
import ActivationAccountController from './controllers/ActivationAccountController';
import SessionController from './controllers/SessionController';
import ForgetPasswordController from './controllers/ForgetPasswordController';
import NoteController from './controllers/NoteController';
import Auth from './middlewares/auth';
import { requestLog } from './utils';
import path from 'path';
const routes = express.Router();

routes.use('/public', express.static('public'));
routes.use(requestLog);

// Rotas sem autenticação 
routes.get('/', (_, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'status', 'status.html')));
routes.get('/account/:token', ActivationAccountController.create);
routes.post('/users', UserController.create);
routes.post('/session', SessionController.create);
routes.post('/forgetPassword', ForgetPasswordController.create);

routes.use(Auth);

// Rotas com autenticação
routes.get('/users/:userId', UserController.read);
routes.post('/notes', NoteController.create);
routes.get('/notes', NoteController.index);
routes.put('/notes/:noteId', NoteController.update);
routes.delete('/notes/:noteId', NoteController.delete);

export default routes;