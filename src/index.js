import express from 'express'
import routes from './routes'
import 'dotenv'

const app = express()

app.use(express.json())
app.use(routes)

app.listen(process.env.SERVER_PORT || 3333, () => {
  console.log(`server running in port ${process.env.SERVER_PORT || 3333}`)
})