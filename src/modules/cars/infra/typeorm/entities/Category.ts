import { v4 as uuidV4 } from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('categories')
//CRIANDO A CLASSE CATEGORIA PARA TIPAR OS VALORES DOS ATRIBUTOS
class Category {
	@PrimaryColumn()
	id?: string

	@Column()
	name: string

	@Column()
	description: string

	@CreateDateColumn()
	created_at: Date

	//caso não exista id, crie um novo id
	constructor() {
		if (!this.id) {
			this.id = uuidV4()
		}
	}
}

export { Category }
