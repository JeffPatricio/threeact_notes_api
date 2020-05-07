const bcryptjs = require('bcryptjs');
const path = require('path');
const connection = require('../database/connection');
const { isEmail, simpleHash, decrypt } = require('../utils/index');
const mailController = require('./MailController');

module.exports = {
	async create(req, res) {
		try {
			const { email } = req.body;
			if (!isEmail(email) || !email) return res.status(400).json({ success: false, code: 'invalid_email', message: 'O e-mail informado é inválido' });
			const queryUser = await connection('users').where('email', email).first();
			if (!queryUser) return res.status(404).json({ success: false, code: 'invalid_email', message: 'O e-mail informado é inválido' });
			const token = simpleHash(30);
			const updated = await connection('users').where({ email }).first().update({ token_recover_password: token });
			if (updated) {
				await mailController.forgetPasswordEmail(email, token);
				return res.json({ success: true, message: 'E-mail de recuperação enviado com sucesso' });
			}
			return res.status(400).json({ success: false, code: 'unknown_error', message: 'Ocorreu um erro ao enviar o e-mail de recuperação de senha' });
		} catch (err) {
			console.log('Error sending password recovery email: ', err.toString());
			return res.status(400).json({ success: false, code: 'unknown_error', message: err.toString() });
		}
	},
	async read(req, res) {
		try {
			const { token, emailHash } = req.params;
			const email = decrypt(emailHash);
			if (!isEmail(email) || !token) return res.send('Solicitação Inválida');
			const user = await connection('users').where({ email }).first().select(['token_recover_password']);
			if (!user) return res.send('Solicitação Inválida');
			return user.token_recover_password === token ? res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'forgotPassword', 'index.html')) : res.send('Solicitação Inválida');
		} catch (err) {
			console.log('Error when validating password recovery token: ', err.toString());
			return res.send('Solicitação Inválida');
		}
	},
	async update(req, res) {
		try {
			const { token } = req.headers;
			const { password, confirmPassword } = req.body;
			if (!token) return res.status(403).json({ success: false, code: 'invalid_token', message: 'Solititação para alteração de senha não autorizada' });
			if ((!password || !confirmPassword) || (password !== confirmPassword)) return res.status(400).json({ success: false, code: 'invalid_data', message: 'As senhas inseridas não conferem' });
			if (password.length < 6 || confirmPassword.length < 6) return res.status(400).json({ success: false, code: 'invalid_data', message: 'A senha deve conter no mínimo 6 caracteres' });
			const [tokenRequest, emailEncrypt] = token.split('/');
			const email = decrypt(emailEncrypt);
			if (!isEmail(email) || !email) return res.status(403).json({ success: false, code: 'invalid_token', message: 'Solititação para alteração de senha não autorizada' });
			const user = await connection('users').where({ email }).first().select(['token_recover_password']);
			if (!user) return res.status(404).json({ success: false, code: 'unknown_user', message: 'Não foi possível encontrar o usuário solicitado' });
			if (user.token_recover_password !== tokenRequest) return res.status(403).json({ success: false, code: 'invalid_token', message: 'Solititação para alteração de senha não autorizada' });
			const passCrypt = await bcryptjs.hashSync(password, 10);
			const updated = await connection('users').where({ email }).first().update({ email_verified: true, token_recover_password: '', password: passCrypt });
			return updated ?
				res.json({ success: true, message: 'Senha alterada com sucesso!' }) :
				res.status(400).json({ success: false, code: 'unknown_error', message: 'Ocorreu um erro ao realizar a atualização de senha' });
		} catch (err) {
			console.log('Error updating user password: ', err.toString());
			return res.status(500).json({ success: false, code: 'unknown_error', message: err.toString() });
		}
	}
}


