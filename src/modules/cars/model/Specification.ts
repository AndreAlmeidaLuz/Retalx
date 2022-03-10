import { v4 as uuidV4 } from 'uuid'

class Specification {
	//CRIANDO A CLASSE Specification PARA TIPAR OS VALORES DOS ATRIBUTOS
	id?: string
	name: string
	description: string
	created_at: Date

	//caso não exista id, crie um novo id
	constructor() {
		if (!this.id) {
			this.id = uuidV4()
		}
	}
}

export { Specification }
