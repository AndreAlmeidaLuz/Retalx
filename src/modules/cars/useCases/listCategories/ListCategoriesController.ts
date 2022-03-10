import { Request, Response } from 'express'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

class ListCategoriesController {
	//criando construtor pára chamar a classe CreateCategoryUseCase
	constructor(private listCategoryUseCase: ListCategoriesUseCase) {}
	handle(request: Request, response: Response): Response {
		//chamando o metodo que lista as categorias cadastradas:
		const all = this.listCategoryUseCase.execute()

		return response.status(201).json(all)
	}
}

export { ListCategoriesController }
