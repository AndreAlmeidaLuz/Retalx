import { Request, Response } from 'express'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

class CreateCategoryController {
	//criando construtor pára chamar a classe CreateCategoryUseCase
	constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

	handlle(request: Request, response: Response): Response {
		//pegando os valores name e description no corpo da requisicao:
		const { name, description } = request.body

		//chamando de dentro da classe createCategoryService o metodo execute
		this.createCategoryUseCase.execute({ name, description })

		return response.status(201).send()
	}
}

export { CreateCategoryController }
