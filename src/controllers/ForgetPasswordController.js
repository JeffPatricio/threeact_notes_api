import connection from '../database/connection';
import { decrypt, isEmail } from '../utils/index';

export default {
	async create(req, res) {
		try {
			const { email } = req.body;
			if (!isEmail(email) || !email) return res.status(400).json({ success: false, message: 'E-mail inválido' });

		} catch (err) {
			console.log('Erro ao enviar email de recuperação de senha: ', err.toString());
		}
	}
}


