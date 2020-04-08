import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import authConfig from '../config/auth'

const verifyAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ success: false, error: 'Token não fornecido.', auth: false })
  }

  const [, token] = authHeader.split(' ')

  try {
    const { id } = await promisify(jwt.verify)(token, authConfig.secret)
    req.userId = id
    return next()
  } catch (e) {
    return res.status(401).json({ success: false, error: 'Token invalid.', auth: false })
  }
}

export default verifyAuth