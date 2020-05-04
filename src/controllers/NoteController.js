import connection from '../database/connection';
import moment from 'moment';

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
		try {
			const { userId } = req;
			const { noteId } = req.params;
			const note = await connection('notes').where('id', noteId).select(['user_id']).first();
			if (note) {
				if (note.user_id === userId) {
					const { title, content } = req.body;
					if (!title || !content) return res.status(400).json({ success: false, message: 'Favor informar os campos destacados' });

					const update = await connection('notes').where('id', noteId).update({
						title,
						content,
						updated_at: moment().format()
					});

					if (update === 1) {
						return res.status(200).json({ success: true, message: 'Anotação atualizada' });
					} else {
						return res.status(200).json({ success: false, message: 'Não foi possível atualizar anotação' });
					}
				} else {
					return res.status(401).json({ success: false, message: 'Usuário não é dono da anotação' });
				}
			} else {
				return res.status(400).json({ success: false, message: 'Não foi possível localizar anotação' });
			}
		} catch (err) {
			return res.status(500).json({ success: false, message: err.toString() });
		}
	},

	async delete(req, res) {

	}
}