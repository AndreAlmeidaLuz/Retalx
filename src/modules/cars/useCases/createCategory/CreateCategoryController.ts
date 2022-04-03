import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

class CreateCategoryController {
	async handlle(request: Request, response: Response): Promise<Response> {
		//pegando os valores name e description no corpo da requisicao:
		const { name, description } = request.body

		const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

		await createCategoryUseCase.execute({ name, description })

		return response.status(201).send()
	}
}

export { CreateCategoryController }
