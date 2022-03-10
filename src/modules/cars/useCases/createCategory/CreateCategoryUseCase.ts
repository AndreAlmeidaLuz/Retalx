import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IRequest {
	name: string
	description: string
}

class CreateCategoryUseCase {
	constructor(private categoriesRepository: ICategoriesRepository) {}

	execute({ name, description }: IRequest): void {
		//chamadno o metodo findByName dentro  da classe CategoriesRepository:
		const categoryAlreadyExists = this.categoriesRepository.findByName(name)

		//se existir uma categoria já cadastrada ele informa um erro e não permite o cadastro novamente
		if (categoryAlreadyExists) {
			throw new Error('Category Already exists!')
		}

		//chamando a funcao create que está dentro da classe CategoriesRepository e puxando os valores passados do corpo da requisicao:
		this.categoriesRepository.create({ name, description })
	}
}

export { CreateCategoryUseCase }
