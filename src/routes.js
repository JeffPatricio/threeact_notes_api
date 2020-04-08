import express, { Router } from 'express'
import userController from './controllers/UserController'
import { requestLog } from './utils'
import path from 'path'

const routes = express.Router()

routes.use(requestLog)
routes.use('/static', express.static('public'))

// Rotas sem autenticação 
routes.get('/', (req, res) => {
  res.json({ status: 'ok', running: true })
})

routes.get('/account/activate', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'activation', 'confirm.html'))
})

routes.post('/users', userController.create)

routes.get('/account/:token', (req, res) => {
  console.log('ativar conta')
  console.log('token => ', req.params.token)
})



// Rotas com autenticação
routes.get('/users/:userId', userController.read)

routes.get('/listTest', userController.listTest)


export default routes