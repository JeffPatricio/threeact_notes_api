import 'dotenv/config'

export default {
  secret: process.env.SECRET_AUTH,
  expiresIn: '1d'
}