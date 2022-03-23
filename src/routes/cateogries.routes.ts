import { Router } from 'express'
import multer from 'multer'

import { listCategoriesController } from '../modules/cars/useCases/listCategories'
import { createCategoryController } from '../modules/cars/useCases/createCategory'
import { importCategoryController } from '../modules/cars/useCases/importCategory'

const categoriesRoutes = Router()

//fazer upload de arquivo
const upload = multer({
	dest: './tmp', //informando qual será o destino/pasta
})

//==========ROTA PARA CADASTRAR:=========//
categoriesRoutes.post('/', (request, response) => {
	console.log('reload on')
	return createCategoryController.handlle(request, response)
})

//==========ROTA PARA LISTAR:=========//
categoriesRoutes.get('/', (request, response) => {
	return listCategoriesController.handle(request, response)
})

//==========ROTA PARA IMPORTAR ARQUIVOS:=========//
categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
	return importCategoryController.handle(request, response)
})

export { categoriesRoutes }
