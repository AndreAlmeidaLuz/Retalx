import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'

export async function ensureAdmin(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const { id } = request.user

	const usersrepository = new UsersRepository()
	const user = await usersrepository.findById(id)

	if (!user.isAdmin) {
		throw new AppError('User not is a admin')
	}

	return next()
}
