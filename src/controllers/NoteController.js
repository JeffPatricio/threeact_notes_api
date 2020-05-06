import connection from '../database/connection';
import moment from 'moment';

export default {
	async create(req, res) {
		try {
			const { userId } = req;
			const { title, content } = req.body;
			if (!title || !content) return res.status(400).json({ success: false, code: 'invalid_data', message: 'Necessário informar todos os campos' });
			const [id] = await connection('notes').insert({ title, content, user_id: userId });
			if (id) return res.status(201).json({ success: true, message: 'Anotação cadastrada com sucesso' });
			return res.status(400).json({ success: false, code: 'unknown_error', message: 'Ocorreu um erro ao criar a anotação' });
		} catch (err) {
			console.log('Error creating new annotation: ', err.toString());
			return res.status(500).json({ success: false, code: 'unknown_error', message: err.toString() });
		}
	},

	async index(req, res) {
		try {
			const { userId } = req;
			const notes = await connection('notes').where('user_id', userId).select(['title', 'content', 'created_at']);
			return notes.length > 0 ? res.status(200).json({ success: true, content: notes }) : res.status(200).json({ success: false, code: 'unknown_error', content: notes });
		} catch (err) {
			console.log('Error fetching registered notes: ', err.toString());
			return res.status(500).json({ success: false, code: 'unknown_error', message: err.toString() });
		}
	},

	async update(req, res) {
		try {
			const { userId } = req;
			const { noteId } = req.params;
			const { title, content } = req.body;
			if (!title || !content) return res.status(400).json({ success: false, code: 'invalid_data', message: 'Necessário informar todos os campos' });
			const note = await connection('notes').where('id', noteId).select(['user_id']).first();
			if (note) {
				if (note.user_id === userId) {
					const updated = await connection('notes').where('id', noteId).update({
						title,
						content,
						updated_at: moment().format()
					});
					return updated === 1 ?
						res.status(200).json({ success: true, message: 'Anotação atualizada' }) :
						res.status(200).json({ success: false, code: 'unknown_error', message: 'Não foi possível atualizar anotação' });
				}
				return res.status(401).json({ success: false, code: 'unauthorized', message: 'Usuário não autorizado para atualizar a anotação' });
			}
			return res.status(400).json({ success: false, code: 'unknown_note', message: 'Não foi possível encontrar a anotação' });
		} catch (err) {
			console.log('Error updating note: ', err.toString());
			return res.status(500).json({ success: false, code: 'unknown_error', message: err.toString() });
		}
	},

	async delete(req, res) {
		try {
			const { userId } = req;
			const { noteId } = req.params;
			const note = await connection('notes').where('id', noteId).select(['user_id']).first();
			if (note) {
				if (note.user_id === userId) {
					const deleted = await connection('notes').where('id', noteId).delete();
					return deleted === 1 ?
						res.status(200).json({ success: true, message: 'Anotação excluida' }) :
						res.status(200).json({ success: false, code: 'unknown_error', message: 'Não foi possível excluir anotação' });
				}
				return res.status(401).json({ success: false, code: 'unauthorized', message: 'Usuário não autorizado para excluir a anotação' });
			}
			return res.status(400).json({ success: false, code: 'unknown_note', message: 'Não foi possível encontrar a anotação' });
		} catch (err) {
			console.log('Error deleting note: ', err.toString());
			return res.status(500).json({ success: false, code: 'unknown_error', message: err.toString() });
		}
	}
}