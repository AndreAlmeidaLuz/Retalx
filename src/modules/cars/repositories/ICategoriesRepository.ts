import { Category } from '../infra/typeorm/entities/Category'

//DTO == Data Transfer object
interface ICreateCategoryDTO {
	//criando uma interface
	name: string
	description: string
}

interface ICategoriesRepository {
	findByName(name: string): Promise<Category>
	list(): Promise<Category[]>
	create({ name, description }: ICreateCategoryDTO): Promise<void>
}

export { ICategoriesRepository, ICreateCategoryDTO }
