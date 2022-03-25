import { Category } from '../../entities/Category'
import {
	ICategoriesRepository,
	ICreateCategoryDTO,
} from '../ICategoriesRepository'

import { getRepository, Repository } from 'typeorm'

class CategoriesRepository implements ICategoriesRepository {
	private repository: Repository<Category>

	constructor() {
		this.repository = getRepository(Category)
	}

	//criando uma funcao create, onde são passados os valores que serão cadastrados
	async create({ name, description }: ICreateCategoryDTO): Promise<void> {
		const category = this.repository.create({
			description,
			name,
		})

		//salvar dados da categoria
		await this.repository.save(category)
	}

	//listando  os dados: o metodo list tem as caracteristicas da classe Category e retorna os dados cadastrados no arrar categories
	async list(): Promise<Category[]> {
		const categories = await this.repository.find()
		return categories
	}

	//Regra de negocio: verificando se já existe uma categoria cadastrada
	async findByName(name: string): Promise<Category> {
		const categoryExists = await this.repository.findOne({ name })
		return categoryExists
	}
}

export { CategoriesRepository }
