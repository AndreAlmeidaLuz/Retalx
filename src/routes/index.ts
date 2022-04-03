import { Router } from 'express'
import { authenticateRoutes } from './authenticate.routes'
import { categoriesRoutes } from './cateogries.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'

const router = Router()

//chamando a rota 'categoriesRoutes'
router.use('/categories', categoriesRoutes)
//chamando a rota 'specificationsRoutes'
router.use('/specifications', specificationsRoutes)
//chamando a rota 'usersRoutes
router.use('/users', usersRoutes)
//chamando a rota de autenticacao
router.use(authenticateRoutes)

export { router }
