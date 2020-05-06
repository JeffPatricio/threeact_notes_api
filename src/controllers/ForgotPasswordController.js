import bcryptjs from 'bcryptjs';
import path from 'path';
import connection from '../database/connection';
import { isEmail, simpleHash, decrypt } from '../utils/index';
import mailController from './MailController';

export default {
	async create(req, res) {
		try {
			const { email } = req.body;
			if (!isEmail(email) || !email) return res.status(400).json({ success: false, message: 'E-mail inválido' });
			const queryUser = await connection('users').where('email', email).first();
			if (!queryUser) return res.status(404).json({ success: false, message: 'E-mail inválido' });
			const token = simpleHash(30);
			const updated = await connection('users').where({ email }).first().update({ token_recover_password: token });
			if (updated) {
				await mailController.forgetPasswordEmail(email, token);
				return res.json({ success: true, message: 'Email de recuperação enviado com sucesso' });
			}
			return res.status(400).json({ success: false, message: 'Ocorreu um erro ao enviar o e-mail de recuperação de senha' });
		} catch (err) {
			return res.status(400).json({ success: false, message: err.toString() });
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
			return res.send('Solicitação Inválida');
		}
	},
	async update(req, res) {
		try {

			const { token } = req.headers;
			const { password, confirmPassword } = req.body;

			if (!token) return res.status(403).json({ success: false, message: 'Alteração de senha com token inválido' });
			if ((!password || !confirmPassword) || (password !== confirmPassword)) return res.status(400).json({ success: false, message: 'As senhas inseridas não conferem' });
			if (password.length < 6 || confirmPassword.length < 6) return res.status(400).json({ success: false, message: 'A senha deve conter no mínimo 6 vcaracteres' });

			const [tokenRequest, emailEncrypt] = token.split('/');
			const email = decrypt(emailEncrypt);
			if (!isEmail(email) || !email) return res.status(403).json({ success: false, message: 'Alteração de senha com token inválido' });

			const user = await connection('users').where({ email }).first().select(['token_recover_password']);
			if (!user) return res.status(404).json({ success: false, message: 'Não foi possível encontrar o usuário solicitado' });
			if (user.token_recover_password !== tokenRequest) return res.status(403).json({ success: false, message: 'Alteração de senha com token inválido' });

			const passCrypt = await bcryptjs.hashSync(password, 10);
			const updated = await connection('users').where({ email }).first().update({ token_recover_password: '', password: passCrypt });

			return updated ?
				res.json({ success: true, message: 'Senha alterada com sucesso!' }) :
				res.status(400).json({ success: false, message: 'Ocorreu um erro ao realizar a atualização de senha' });
		} catch (err) {
			return res.status(500).json({ success: false, message: err.toString() });
		}
	}
}


