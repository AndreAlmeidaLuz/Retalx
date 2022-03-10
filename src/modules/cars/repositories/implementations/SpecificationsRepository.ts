import { Specification } from '../../model/Specification'
import {
	ICreateSpecificationDTO,
	ISpecificationsRepository,
} from '../ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationsRepository {
	//criando um array de Specification:
	private specifications: Specification[]

	constructor() {
		this.specifications = []
	}

	//metodo para criar
	create({ description, name }: ICreateSpecificationDTO): void {
		const specification = new Specification() //Instanciando a classe Specification
		specification.name = name
		specification.description = description
		specification.created_at = new Date()

		this.specifications.push(specification)
	}

	findByName(name: string): Specification {
		const specification = this.specifications.find(
			(specification) => specification.name === name,
		)

		return specification
	}
}

export { SpecificationsRepository }
