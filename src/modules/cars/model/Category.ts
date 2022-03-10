import { v4 as uuidV4 } from 'uuid'

//CRIANDO A CLASSE CATEGORIA PARA TIPAR OS VALORES DOS ATRIBUTOS
class Category {
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

export { Category }
