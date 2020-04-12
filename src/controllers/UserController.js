import bcryptjs from 'bcryptjs'
import connection from '../database/connection'
import { isEmail } from '../utils/index'
import mailController from './MailController'

export default {
  async create(req, res) {
    try {
      const { name, nickname, email, password } = req.body
      if (!name || !email || !password) return res.status(400).json({ success: false, message: 'JSON inválido' })
      if (!isEmail(email)) return res.status(400).json({ success: false, message: 'E-mail inválido' })
      const userExists = await connection('users').where('email', email).first()
      if (userExists) return res.status(400).json({ success: false, message: 'E-mail já está em uso' })
      const passCrypt = await bcryptjs.hashSync(password, 10)
      const [id] = await connection('users').insert({ name, nickname, email, password: passCrypt })
      if (id) {
        await mailController.activationEmail(name, email)
        return res.status(201).json({ success: true, message: 'Usuário cadastrado' })
      } else {
        return res.status(400).json({ success: false, message: 'Não foi possível cadastrar usuário' })
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: err.toString() })
    }
  },
  async read(req, res) {
    try {
      const { userId } = req.params
      if (!userId) {
        return res.status(404).json({ success: false, message: 'Não foi possível encontrar os dados do usuário' })
      }
      const user = await connection('users').where('id', userId).first().select(['name', 'nickname', 'email'])
      return !user ? res.status(404).json({ success: false, message: 'Não foi possível encontrar os dados do usuário' }) : res.json({ success: true, user })
    } catch (err) {
      return res.status(500).json({ success: false, message: err.toString() })
    }
  },
  async update(req, res) {

    const { userId, name, nickname, oldPassword, newPassword, confirmPassword } = req.body

    if (!name || !nickname) return res.status(400).json({ success: false, message: 'Necessário preencher todos os campos' })

    const user = await connection('users').where('id', userId).first().select(['password'])

    return !user ? res.status(404).json({ success: false, message: 'Não foi possível encontrar os dados do usuário' }) : res.json({ success: true, user })

    // bcryptjs.compareSync(senhaDigitada, senhaBD)





  },
  async listTest(req, res) {
    const users = await connection('users').select(['*'])
    return res.json({ success: true, users })
  }
}


