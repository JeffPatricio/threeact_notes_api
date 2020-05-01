import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connection from '../database/connection';
import { isEmail } from '../utils/index';
import authConfig from '../config/auth';

export default {
	async create(req, res) {

		const { email, password } = req.body;
		if (!email || !password) return res.status(400).json({ success: false, message: 'JSON inválido' });
		if (!isEmail(email)) return res.status(400).json({ success: false, message: 'E-mail inválido' });
		const queryUser = await connection('users').where('email', email).first();
		if (!queryUser) return res.status(404).json({ success: false, message: 'E-mail ou senha incorretos' });
		if (!queryUser.email_verified) return res.status(406).json({ success: false, message: 'Necessário realizar ativação da conta', activationRequired: true });
		const passwordMatch = bcryptjs.compareSync(password, queryUser.password);
		if (!passwordMatch) return res.status(406).json({ success: false, message: 'E-mail ou senha incorretos' });
		return res.status(200).json({
			success: true,
			message: 'Usuário logado com sucesso',
			user: { name: queryUser.name, email: queryUser.email, nickname: queryUser.nickname },
			token: jwt.sign({ id: queryUser.id }, authConfig.secret, { expiresIn: authConfig.expiresIn })
		});
	}
}