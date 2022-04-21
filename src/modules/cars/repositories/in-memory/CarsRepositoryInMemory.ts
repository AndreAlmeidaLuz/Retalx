import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '../ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
	cars: Car[] = []

	async create({
		brand,
		category_id,
		daily_rate,
		description,
		fine_amount,
		name,
		license_plate,
	}: ICreateCarDTO): Promise<Car> {
		const car = new Car()

		Object.assign(car, {
			brand,
			category_id,
			daily_rate,
			description,
			fine_amount,
			name,
			license_plate,
		})

		this.cars.push(car)

		return car
	}

	//VERIFICAR SE EXISTE PLACA JÁ CADASTRADA NO SISTEMA
	async findByLicensePlate(license_plate: string): Promise<Car> {
		return this.cars.find((car) => car.license_plate === license_plate)
	}
}

export { CarsRepositoryInMemory }
