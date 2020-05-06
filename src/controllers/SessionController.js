const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../database/connection');
const { isEmail } = require('../utils/index');
const authConfig = require('../config/auth');

module.exports = {
	async create(req, res) {
		try {
			const { email, password } = req.body;
			if (!email || !password) return res.status(400).json({ success: false, code: 'invalid_data', message: 'Necessário informar todos os campos' });
			if (!isEmail(email)) return res.status(400).json({ success: false, code: 'invalid_email', message: 'O e-mail informado é inválido' });
			const queryUser = await connection('users').where('email', email).first();
			if (!queryUser) return res.status(404).json({ success: false, code: 'incorrect_data', message: 'E-mail ou senha incorretos' });
			if (!queryUser.email_verified) return res.status(406).json({ success: false, code: 'account_inactive', message: 'Necessário realizar ativação da conta', activationRequired: true });
			const passwordMatch = bcryptjs.compareSync(password, queryUser.password);
			if (!passwordMatch) return res.status(406).json({ success: false, code: 'incorrect_data', message: 'E-mail ou senha incorretos' });
			return res.status(200).json({
				success: true,
				message: 'Usuário logado com sucesso',
				user: { name: queryUser.name, email: queryUser.email, nickname: queryUser.nickname },
				token: jwt.sign({ id: queryUser.id }, authConfig.secret, { expiresIn: authConfig.expiresIn })
			});
		} catch (err) {
			console.log('Error when validating login: ', err.toString());
			return res.status(500).json({ success: false, code: 'unknown_error', message: err.toString() });
		}
	}
}