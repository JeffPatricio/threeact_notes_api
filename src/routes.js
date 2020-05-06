const express = require('express');
const path = require('path');
const UserController = require('./controllers/UserController');
const ActivationAccountController = require('./controllers/ActivationAccountController');
const SessionController = require('./controllers/SessionController');
const ForgotPasswordController = require('./controllers/ForgotPasswordController');
const NoteController = require('./controllers/NoteController');
const DocController = require('./controllers/DocController');
const Auth = require('./middlewares/auth');
const { requestLog } = require('./utils');

const routes = express.Router();

routes.use('/public', express.static('public'));
routes.use(requestLog);

routes.get('/', (_, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html')));
routes.get('/favicon.ico', (_, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'favicon.ico')));

routes.get('/docs', DocController.read);
routes.post('/users', UserController.create);
routes.post('/session', SessionController.create);
routes.get('/forgotPassword/:token/:emailHash', ForgotPasswordController.read);
routes.put('/forgotPassword', ForgotPasswordController.update);
routes.post('/forgotPassword', ForgotPasswordController.create);
routes.get('/account/:token', ActivationAccountController.create);

routes.use(Auth);

routes.get('/users', UserController.read);
routes.put('/users', UserController.update);
routes.post('/notes', NoteController.create);
routes.get('/notes', NoteController.index);
routes.put('/notes/:noteId', NoteController.update);
routes.delete('/notes/:noteId', NoteController.delete);

module.exports = routes;