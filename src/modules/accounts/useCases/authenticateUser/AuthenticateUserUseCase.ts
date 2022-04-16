import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
	email: string
	password: string
}

interface IResponse {
	user: {
		name: string
		email: string
	}
	token: string
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		//verificar se usuario existe
		const user = await this.usersRepository.findByEmail(email)
		if (!user) {
			throw new AppError('Email or password incorrect')
		}

		//verificar se senha esta correta
		const passwordMatch = await compare(password, user.password)
		if (!passwordMatch) {
			throw new AppError('Email or password incorrect')
		}

		//gerar jsonwebtoken
		const token = sign({}, 'af15d5fcb3b5ae5123456f2bcddedf15', {
			subject: user.id,
			expiresIn: '1d',
		})

		const tokenReturn: IResponse = {
			token,
			user: {
				name: user.name,
				email: user.email,
			},
		}

		return tokenReturn
	}
}

export { AuthenticateUserUseCase }
