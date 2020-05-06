import mustache from 'mustache';
import mail from '../config/mail';
import { encrypt } from '../utils/index';
import templateActivation from '../templates/mail/accountActivation';
import templatePassword from '../templates/mail/forgetPassword';
import 'dotenv/config';

export default {
	activationEmail(name, email) {
		return new Promise((resolve) => {
			const token = encrypt(email);
			mail.options.subject = `Ativação de Conta ${name}`;
			mail.options.to = email;
			mail.options.html = mustache.render(templateActivation, { url: `${process.env.SERVER_URL}/account/${token}` });
			mail.transporter.close();
			mail.transporter.sendMail(mail.options, (error, info) => {
				if (error) {
					console.log('Error sending activation email: ', error.toString());
					return resolve();
				} else {
					console.log(`Activation email sent to ${email}: ${info.response}`);
					return resolve();
				}
			})
		})
	},
	forgetPasswordEmail(email, token) {
		return new Promise((resolve) => {
			const emailHash = encrypt(email);
			mail.options.subject = 'Recuperar senha';
			mail.options.to = email;
			mail.options.html = mustache.render(templatePassword, { url: `${process.env.SERVER_URL}/forgotPassword/${token}/${emailHash}` });
			mail.transporter.close();
			mail.transporter.sendMail(mail.options, (error, info) => {
				if (error) {
					console.log('Error sending password recovery email: ', error.toString());
					return resolve();
				} else {
					console.log(`Password recovery email sent to ${email}: ${info.response}`);
					return resolve();
				}
			})
		})
	}
}