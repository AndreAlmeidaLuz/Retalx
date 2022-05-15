import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/inmemory/RentalsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'
import { CreateRentalUseCase } from './CreateRentalUseCase'
import dayjs from 'dayjs'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'

let createrentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider

describe('Create Rental', () => {
	const dayAdd24hours = dayjs().add(1, 'day').toDate()
	beforeEach(() => {
		rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
		dayjsDateProvider = new DayjsDateProvider()
		createrentalUseCase = new CreateRentalUseCase(
			rentalsRepositoryInMemory,
			dayjsDateProvider,
		)
	})

	it('shold be able to create a new rental', async () => {
		const rental = await createrentalUseCase.execute({
			user_id: '12345',
			car_id: '121212',
			expected_return_date: dayAdd24hours,
		})

		console.log(rental)

		expect(rental).toHaveProperty('id')
		expect(rental).toHaveProperty('start_date')
	})

	it('shold not be able to create a new rental if there is another open to the same user', async () => {
		expect(async () => {
			await createrentalUseCase.execute({
				user_id: '12345',
				car_id: '121212',
				expected_return_date: new Date(),
			})
			await createrentalUseCase.execute({
				user_id: '12345',
				car_id: '121212',
				expected_return_date: new Date(),
			})
		}).rejects.toBeInstanceOf(AppError)
	})

	it('shold not be able to create a new rental if there is another open to the same car', async () => {
		expect(async () => {
			await createrentalUseCase.execute({
				user_id: '123',
				car_id: 'teste',
				expected_return_date: dayAdd24hours,
			})
			await createrentalUseCase.execute({
				user_id: '321',
				car_id: 'teste',
				expected_return_date: dayAdd24hours,
			})
		}).rejects.toBeInstanceOf(AppError)
	})

	it('shold not be able to create a new rental with invalid return time', async () => {
		expect(async () => {
			await createrentalUseCase.execute({
				user_id: '123',
				car_id: 'teste',
				expected_return_date: dayjs().toDate(),
			})
		}).rejects.toBeInstanceOf(AppError)
	})
})
