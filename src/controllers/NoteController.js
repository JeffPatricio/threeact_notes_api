import connection from '../database/connection';

export default {
	async create(req, res) {
		try {
			const { userId } = req;
			const { title, content } = req.body;
			if (!title || !content) return res.status(400).json({ success: false, message: 'Favor informar os campos destacados' });
			const [id] = await connection('notes').insert({ title, content, user_id: userId });
			if (id) {
				return res.status(201).json({ success: true, message: 'Anotação cadastrada' });
			} else {
				return res.status(400).json({ success: false, message: 'Não foi possível criar anotação' });
			}
		} catch (err) {
			return res.status(500).json({ success: false, message: err.toString() });
		}
	},

	async index(req, res) {

	},

	async read(req, res) {

	},

	async update(req, res) {

	},

	async delete(req, res) {

	}
}