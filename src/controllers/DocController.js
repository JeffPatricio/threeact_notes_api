module.exports = {
	async read(req, res) {
		return res.json({
			'app': 'notes',
			'empresa': 'threeact',
			'endpoints': {
				'docs': {
					'GET /': {
						'autenticacao': 'nenhuma',
						'parametros': 'nenhum',
						'headers': 'nenhum',
						'objetivo': 'Retorna um json informativo a fim de explicar a estrutura de consumo da API.',
						'return_type': 'json'
					}
				},
				'users': {
					'GET /': {
						'autenticacao': 'token',
						'parametros': 'nenhum',
						'headers': 'Authorization',
						'objetivo': 'Retorna as informações de determinado usuário através da identificação pelo token de autenticação.',
						'respostas': [
							{ success: false, code: 'unknown_user', message: 'Não foi possível encontrar os dados do usuário' },
							{ success: false, code: 'unknown_error', message: '(exception.toString())' },
							{ success: true, user: "{name, nickname, email}" }
						],
						'return_type': 'json'
					},
					'POST /': {
						'autenticacao': 'nenhuma',
						'parametros': 'nenhum',
						'headers': 'nenhum',
						'body': "{name, nickname, email, password}",
						'objetivo': 'Endpoint utilizado para criação de usuários na plataforma.',
						'respostas': [
							{ success: false, code: 'invalid_data', message: 'Necessário informar todos os campos' },
							{ success: false, code: 'invalid_email', message: 'O e-mail informado é inválido' },
							{ success: false, code: 'duplicated_email', message: 'O e-mail informado já está em uso' },
							{ success: true, message: 'Usuário cadastrado com sucesso' },
							{ success: false, code: 'unknown_error', message: 'Ocorreu um erro ao cadastrar o usuário' },
							{ success: false, code: 'unknown_error', message: '(exception.toString())' }
						],
						'return_type': 'json'
					},
					'PUT /': {
						'autenticacao': 'token',
						'parametros': 'nenhum',
						'headers': 'Authorization',
						'body': "{ name, nickname, oldPassword(opcional), newPassword(opcional), confirmPassword(opcional) }",
						'objetivo': 'Endpoint utilizado para atualização dos dados do usuário.',
						'respostas': [
							{ success: false, code: 'invalid_data', message: 'Necessário informar todos os campos' },
							{ success: false, code: 'unknown_user', message: 'Não foi possível encontrar os dados do usuário' },
							{ success: false, code: 'incorrect_data', message: 'A senha informada não corresponde com a senha cadastrada' },
							{ success: false, code: 'incorrect_data', message: 'As senhas não combinam' },
							{ success: true, message: 'Usuário atualizado' },
							{ success: false, code: 'unknown_error', message: 'Não foi possível atualizar usuário' },
							{ success: false, code: 'unauthorized', message: 'Não é possível alterar dados de outro usuário' },
							{ success: false, code: 'unknown_error', message: '(exception.toString())' }
						],
						'return_type': 'json'
					}
				},
				'notes': {
					'GET /': {
						'autenticacao': 'token',
						'parametros': 'nenhum',
						'headers': 'Authorization',
						'objetivo': 'Retorna as informações das anotações de determinado usuário através da identificação pelo token de autenticação.',
						'respostas': [
							{ success: false, code: 'unknown_error', content: {} },
							{ success: false, code: 'unknown_error', message: '(exception.toString())' },
							{ success: true, content: "{title, content, created_at}" }
						],
						'return_type': 'json'
					},
					'POST /': {
						'autenticacao': 'token',
						'parametros': 'nenhum',
						'headers': 'Authorization',
						'body': "{ title, content }",
						'objetivo': 'Endpoint utilizado para criação de anotações na plataforma.',
						'respostas': [
							{ success: false, code: 'invalid_data', message: 'Necessário informar todos os campos' },
							{ success: true, message: 'Anotação cadastrada com sucesso' },
							{ success: false, code: 'unknown_error', message: 'Ocorreu um erro ao criar a anotação' },
							{ success: false, code: 'unknown_error', message: '(exception.toString())' }
						],
						'return_type': 'json'
					},
					'PUT /:noteId': {
						'autenticacao': 'token',
						'parametros': 'noteId',
						'headers': 'Authorization',
						'body': "{ title, content }",
						'objetivo': 'Endpoint utilizado para atualização das anotações do usuário.',
						'respostas': [
							{ success: false, code: 'invalid_data', message: 'Necessário informar todos os campos' },
							{ success: true, message: 'Anotação atualizada' },
							{ success: false, code: 'unknown_error', message: 'Não foi possível atualizar anotação' },
							{ success: false, code: 'unauthorized', message: 'Usuário não autorizado para atualizar a anotação' },
							{ success: false, code: 'unknown_note', message: 'Não foi possível encontrar a anotação' },
							{ success: false, code: 'unknown_error', message: '(exception.toString())' }
						],
						'return_type': 'json'
					},
					'DELETE /:noteId': {
						'autenticacao': 'token',
						'parametros': 'noteId',
						'headers': 'Authorization',
						'objetivo': 'Endpoint utilizado para deletar anotações do usuário.',
						'respostas': [
							{ success: true, message: 'Anotação excluida' },
							{ success: false, code: 'unknown_error', message: 'Não foi possível excluir anotação' },
							{ success: false, code: 'unauthorized', message: 'Usuário não autorizado para excluir a anotação' },
							{ success: false, code: 'unknown_note', message: 'Não foi possível encontrar a anotação' },
							{ success: false, code: 'unknown_error', message: '(exception.toString())' }
						],
						'return_type': 'json'
					}
				},
				'session': {
					'POST /': {
						'autenticacao': 'nenhuma',
						'parametros': 'nenhum',
						'headers': 'nenhum',
						'body': "{ email, password }",
						'objetivo': 'Endpoint utilizado para realizar login na plataforma.',
						'respostas': [
							{ success: false, code: 'invalid_data', message: 'Necessário informar todos os campos' },
							{ success: false, code: 'invalid_email', message: 'O e-mail informado é inválido' },
							{ success: false, code: 'incorrect_data', message: 'E-mail ou senha incorretos' },
							{ success: false, code: 'account_inactive', message: 'Necessário realizar ativação da conta', activationRequired: true },
							{ success: true, message: 'Usuário logado com sucesso', user: "{ name, email, nickname }", token: 'exampletoken' },
							{ success: false, code: 'unknown_error', message: '(exception.toString())' }
						],
						'return_type': 'json'
					},
				},
				'forgotPassword': {
					'POST /': {
						'autenticacao': 'nenhuma',
						'parametros': 'nenhum',
						'headers': 'nenhum',
						'body': "{ email }",
						'objetivo': 'Endpoint utilizado para realizar solicitação de alteração de senha.',
						'respostas': [
							{ success: false, code: 'invalid_email', message: 'O e-mail informado é inválido' },
							{ success: true, message: 'E-mail de recuperação enviado com sucesso' },
							{ success: false, code: 'unknown_error', message: 'Ocorreu um erro ao enviar o e-mail de recuperação de senha' },
							{ success: false, code: 'unknown_error', message: '(exception.toString())' }
						],
						'return_type': 'json'
					},
					'GET /:token/:emailHash': {
						'autenticacao': 'nenhuma',
						'parametros': 'token,emailHash',
						'headers': 'nenhum',
						'objetivo': 'Endpoint utilizado para consultar e validar solicitação de alteração de senha.',
						'respostas': [
							'Solicitação Inválida',
							'file.html'
						],
						'return_type': 'text, file'
					},
					'PUT /': {
						'autenticacao': 'token',
						'parametros': 'nenhum',
						'headers': 'token',
						'body': "{ password, confirmPassword }",
						'objetivo': 'Endpoint utilizado para confirmar a atualização de senha do usuário.',
						'respostas': [
							{ success: false, code: 'invalid_token', message: 'Solititação para alteração de senha não autorizada' },
							{ success: false, code: 'invalid_data', message: 'As senhas inseridas não conferem' },
							{ success: false, code: 'invalid_data', message: 'A senha deve conter no mínimo 6 caracteres' },
							{ success: false, code: 'unknown_user', message: 'Não foi possível encontrar o usuário solicitado' },
							{ success: true, message: 'Senha alterada com sucesso!' },
							{ success: false, code: 'unknown_error', message: 'Ocorreu um erro ao realizar a atualização de senha' },
							{ success: false, code: 'unknown_error', message: '(exception.toString())' }
						],
						'return_type': 'json'
					}
				},
				'account': {
					'GET /:token': {
						'autenticacao': 'nenhuma',
						'parametros': 'token',
						'headers': 'nenhum',
						'objetivo': 'Endpoint utilizado para confirmar a ativação de conta do usuário.',
						'respostas': [
							'file.html'
						],
						'return_type': 'file'
					}
				}
			},
			'codigos_erro': {
				'unknown_user': 'O usuário solicitado não foi encontrado',
				'unknown_error': 'Ocorreu um erro desconhecido',
				'invalid_data': 'Os dados recebidos estão incompletos',
				'invalid_email': 'O email recebido está com um formato inválido ou vazio',
				'duplicated_email': 'O email recebido ja está cadastrado no sistema',
				'incorrect_data': 'Os dados recebidos estão incorretos',
				'unauthorized': 'O usuário não possui autorização para a requisição',
				'unknown_note': 'A nota solicitada não foi encontrada',
				'account_inactive': 'Necessário ativar a conta do usuário'
			}
		})
	}
}