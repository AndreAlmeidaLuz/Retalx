import { v4 as uuidV4 } from 'uuid'

class Rental {
	id: string

	car_id: string

	user_id: string

	start_date: string

	end_date: string

	expected_return_date: string

	total: string

	created_at: Date

	updated: Date

	constructor() {
		if (!this.id) {
			this.id = uuidV4()
		}
	}
}

export { Rental }
