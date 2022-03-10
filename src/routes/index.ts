import { Router } from 'express'
import { categoriesRoutes } from './cateogries.routes'
import { specificationsRoutes } from './specifications.routes'

const router = Router()

//chamando a rota 'categoriesRoutes'
router.use('/categories', categoriesRoutes)
//chamando a rota 'specificationsRoutes'
router.use('/specifications', specificationsRoutes)

export { router }
