import path from 'path';
import connection from '../database/connection';
import { decrypt, isEmail } from '../utils/index';

export default {
	async create(req, res) {
		try {
			const { token } = req.params;
			const email = decrypt(token);
			const srcError = path.resolve(__dirname, '..', '..', 'public', 'activation', 'error.html');
			const srcSuccess = path.resolve(__dirname, '..', '..', 'public', 'activation', 'confirm.html');
			if (!isEmail(email) || !token) return res.sendFile(srcError);
			const user = await connection('users').where({ email }).first().select(['name', 'email', 'email_verified']);
			if (user.email_verified) return res.sendFile(srcSuccess);
			if (!user) return res.sendFile(srcError);
			const active = await connection('users').where({ email }).first().update({ email_verified: true });
			return res.sendFile(active ? srcSuccess : srcError);
		} catch (err) {
			console.log('Error activating account: ', err.toString());
			return res.sendFile(srcError);
		}
	}
}


