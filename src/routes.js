import express from 'express';
import path from 'path';
import UserController from './controllers/UserController';
import ActivationAccountController from './controllers/ActivationAccountController';
import SessionController from './controllers/SessionController';
import ForgotPasswordController from './controllers/ForgotPasswordController';
import NoteController from './controllers/NoteController';
import Auth from './middlewares/auth';
import { requestLog } from './utils';

const routes = express.Router();

routes.use('/public', express.static('public'));
routes.use(requestLog);

routes.get('/', (_, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'status', 'status.html')));
routes.get('/favicon.ico', (_, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'favicon.ico')));

routes.post('/users', UserController.create);
routes.post('/session', SessionController.create);
routes.post('/forgotPassword', ForgotPasswordController.create);
routes.get('/forgotPassword/:token/:emailHash', ForgotPasswordController.read);
routes.put('/forgotPassword', ForgotPasswordController.update);
routes.get('/account/:token', ActivationAccountController.create);

routes.use(Auth);

routes.get('/users', UserController.read);
routes.put('/users', UserController.update);
routes.post('/notes', NoteController.create);
routes.get('/notes', NoteController.index);
routes.put('/notes/:noteId', NoteController.update);
routes.delete('/notes/:noteId', NoteController.delete);

export default routes;