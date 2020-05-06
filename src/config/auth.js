require('dotenv/config');

module.exports = {
	secret: process.env.SECRET_AUTH,
	expiresIn: '1d'
}