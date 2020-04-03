import { Router } from 'express'

const routes = new Router()

routes.get('/', (req, res) => {
  res.json({ status: 'ok', running: true })
})

export default routes