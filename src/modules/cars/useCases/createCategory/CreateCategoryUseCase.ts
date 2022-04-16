import { AppError } from '@shared/errors/AppError'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
	name: string
	description: string
}

@injectable()
class CreateCategoryUseCase {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository,
	) {}

	async execute({ name, description }: IRequest): Promise<void> {
		//chamadno o metodo findByName dentro  da classe CategoriesRepository:
		const categoryAlreadyExists =
			await this.categoriesRepository.findByName(name)

		//se existir uma categoria já cadastrada ele informa um erro e não permite o cadastro novamente
		if (categoryAlreadyExists) {
			throw new AppError('Category Already exists!')
		}

		//chamando a funcao create que está dentro da classe CategoriesRepository e puxando os valores passados do corpo da requisicao:
		this.categoriesRepository.create({ name, description })
	}
}

export { CreateCategoryUseCase }
