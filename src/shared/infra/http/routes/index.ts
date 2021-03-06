import { Router } from 'express'
import { authenticateRoutes } from './authenticate.routes'
import { categoriesRoutes } from './cateogries.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'
import { carsRoutes } from './car.routes'
import { rentalRoutes } from './rental.routes'

const router = Router()

//chamando a rota 'categoriesRoutes'
router.use('/categories', categoriesRoutes)
//chamando a rota 'specificationsRoutes'
router.use('/specifications', specificationsRoutes)
//chamando a rota 'usersRoutes
router.use('/users', usersRoutes)
//chamando a rota de cars
router.use('/cars', carsRoutes)
//chamando a rota de rentals
router.use('/rentals', rentalRoutes)
//chamando a rota de autenticacao
router.use(authenticateRoutes)

export { router }
