import { Rental } from '@modules/rentals/infra/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'
import dayjs from 'dayjs'

interface IRequest {
	user_id: string
	car_id: string
	expected_return_date: Date
}

class CreateRentalUseCase {
	constructor(
		private rentalsRepository: IRentalsRepository,
		private dateProvider: IDateProvider,
	) {}

	async execute({
		user_id,
		car_id,
		expected_return_date,
	}: IRequest): Promise<Rental> {
		const minimumHour = 24
		//Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
		const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
			car_id,
		)

		if (carUnavailable) {
			throw new AppError('Car is unaavailable')
		}
		//Não deve ser possivel cadastrar um novo aluguel casos já exista um aberto para o mesmo usuario
		const rentalOpenToUser =
			await this.rentalsRepository.findOpenRentalByUser(user_id)

		if (rentalOpenToUser) {
			throw new AppError('There a rental in progress for user!')
		}

		//O aluguel deve ter duração mínima de 24 horas.
		const dateNow = this.dateProvider.dateNow()
		const compare = this.dateProvider.compareInHours(
			dateNow,
			expected_return_date,
		)

		if (compare < minimumHour) {
			throw new AppError('Invalid return time!')
		}
		const rental = await this.rentalsRepository.create({
			user_id,
			car_id,
			expected_return_date,
		})

		return rental
	}
}

export { CreateRentalUseCase }
