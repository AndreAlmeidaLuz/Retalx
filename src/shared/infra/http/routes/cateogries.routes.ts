import { Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController'
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController'
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/importCategoryController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const categoriesRoutes = Router()

//fazer upload de arquivo
const upload = multer({
	dest: './tmp', //informando qual será o destino/pasta
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

//==========ROTA PARA CADASTRAR:=========//
categoriesRoutes.post(
	'/',
	ensureAuthenticated,
	ensureAdmin,
	createCategoryController.handlle,
)

//==========ROTA PARA LISTAR:=========//
categoriesRoutes.get('/', listCategoriesController.handle)

//==========ROTA PARA IMPORTAR ARQUIVOS:=========//
categoriesRoutes.post(
	'/import',
	upload.single('file'),
	ensureAuthenticated,
	ensureAdmin,
	importCategoryController.handle,
)

export { categoriesRoutes }
