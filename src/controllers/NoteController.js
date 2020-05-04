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
		try {
			const { userId } = req;
			const notes = await connection('notes').where('user_id', userId).select(['title', 'content', 'created_at']);
			if (notes.length > 0) {
				return res.status(200).json({ success: true, content: notes });
			} else {
				return res.status(200).json({ success: false, content: notes });
			}
		} catch (err) {
			return res.status(500).json({ success: false, message: err.toString() });
		}
	},

	async read(req, res) {

	},

	async update(req, res) {

	},

	async delete(req, res) {

	}
}