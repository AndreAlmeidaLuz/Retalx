import { AppError } from '@shared/errors/AppError'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
	name: string
	description: string
}

@injectable()
class CreateSpecificationUseCase {
	constructor(
		@inject('SpecificationsRepository')
		private specificationsRepository: ISpecificationsRepository,
	) {}

	async execute({ name, description }: IRequest): Promise<void> {
		//chamado metodo que verifica se existe uma especificacao com o mesmo nome
		const specificationAlreadyExists =
			await this.specificationsRepository.findByName(name)

		if (specificationAlreadyExists) {
			//caso exista uma especificacao com o mesmo nome ele retorna um erro
			throw new AppError(`Specification Already Exists!`)
		}

		await this.specificationsRepository.create({ name, description })
	}
}
export { CreateSpecificationUseCase }
