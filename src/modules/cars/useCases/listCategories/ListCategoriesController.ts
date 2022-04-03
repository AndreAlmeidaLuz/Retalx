import { Request, Response } from 'express'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'
import { container } from 'tsyringe'

class ListCategoriesController {
	async handle(request: Request, response: Response): Promise<Response> {
		const listCategoryUseCase = container.resolve(ListCategoriesUseCase)

		//chamando o metodo que lista as categorias cadastradas:
		const all = await listCategoryUseCase.execute()

		return response.status(201).json(all)
	}
}

export { ListCategoriesController }
