const nodemailer = require('nodemailer');
require('dotenv/config');

console.log('*************************************');
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

module.exports = {
	transporter: nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		}
	}),
	options: {
		from: `${process.env.EMAIL_USER}`,
	}
}