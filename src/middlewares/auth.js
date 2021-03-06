const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const connection = require('../database/connection');
const authConfig = require('../config/auth');

const auth = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.status(401).json({ success: false, code: 'invalid_token', message: 'O Token não foi fornecido ou é inválido.', auth: false });
	const token = authHeader.split(' ')[1];
	try {
		const { id } = await promisify(jwt.verify)(token, authConfig.secret);
		const user = await connection('users').where('id', id).first().select(['name']);
		if (!user) return res.status(401).json({ success: false, code: 'invalid_token', message: 'O Token não foi fornecido ou é inválido.', auth: false });
		req.userId = id;
		return next();
	} catch (e) {
		console.log('Error in auth middleware: ', e.toString());
		return res.status(401).json({ success: false, code: 'invalid_token', message: 'O Token não foi fornecido ou é inválido.', auth: false });
	}
}

module.exports = auth;