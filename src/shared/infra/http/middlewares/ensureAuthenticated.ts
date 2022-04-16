import { AppError } from '@shared/errors/AppError'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
	sub: string
}

//VALIDAÇÃO DO TOKEN:
export async function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	//buscando o token que é passado pelo header da requisicao
	const authHeader = request.headers.authorization

	//verifar se o 'authHeader' está vindo preenchido:
	if (!authHeader) {
		throw new AppError('Token missing', 401)
	}

	//desestruturando o token 'separando o nome Beare do restante do token':
	const [, token] = authHeader.split(' ') //split servindo para separar com o espaço
	//criando variavel token dentro do arrary para armazenar o token

	//verificando se o token é valido:
	try {
		const { sub: user_id } = verify(
			token,
			'af15d5fcb3b5ae5123456f2bcddedf15',
		) as IPayload //passando a variavel token e a chave secreta criada no 'UseCase'

		//verificar se usuario existe no banco de dados
		const usersRepository = new UsersRepository()

		const user = await usersRepository.findById(user_id)
		if (!user) {
			throw new AppError('User does not exist! ', 401)
		}

		request.user = {
			id: user_id,
		}

		next()
	} catch {
		throw new AppError('Invalid token!', 401)
	}
}
