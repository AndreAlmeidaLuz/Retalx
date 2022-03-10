import { Category } from '../../model/Category'
import {
	ICategoriesRepository,
	ICreateCategoryDTO,
} from '../ICategoriesRepository'

class CategoriesRepository implements ICategoriesRepository {
	//criando um array category do tipo Category que vem da classe Category
	private categories: Category[]

	private static INSTANCE: CategoriesRepository

	private constructor() {
		this.categories = []
	}

	public static getInstance(): CategoriesRepository {
		if (!CategoriesRepository.INSTANCE) {
			CategoriesRepository.INSTANCE = new CategoriesRepository()
		}
		return CategoriesRepository.INSTANCE
	}

	//criando uma funcao create, onde são passados os valores que serão cadastrados
	create({ name, description }: ICreateCategoryDTO): void {
		const category = new Category()
		category.name = name
		category.description = description
		category.created_at = new Date()

		//adicionando os valores passados para dentro do array category
		this.categories.push(category)
	}

	//listando  os dados: o metodo list tem as caracteristicas da classe Category e retorna os dados cadastrados no arrar categories
	list(): Category[] {
		return this.categories
	}

	//Regra de negocio: verificando se já existe uma categoria cadastrada
	findByName(name: string) {
		const categoryExists = this.categories.find(
			(category) => category.name === name,
		)
		return categoryExists
	}
}

export { CategoriesRepository }
