import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'

interface IRequest {
	name: string
	description: string
}

class CreateSpecificationUseCase {
	constructor(private specificationsRepository: ISpecificationsRepository) {}

	execute({ name, description }: IRequest): void {
		//chamado metodo que verifica se existe uma especificacao com o mesmo nome
		const specificationAlreadyExists =
			this.specificationsRepository.findByName(name)

		if (specificationAlreadyExists) {
			//caso exista uma especificacao com o mesmo nome ele retorna um erro
			throw new Error(`Specification Already Exists!`)
		}

		this.specificationsRepository.create({ name, description })
	}
}
export { CreateSpecificationUseCase }
