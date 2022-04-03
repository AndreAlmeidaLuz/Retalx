import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('specifications')
class Specification {
	//CRIANDO A CLASSE Specification PARA TIPAR OS VALORES DOS ATRIBUTOS
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

export { Specification }
