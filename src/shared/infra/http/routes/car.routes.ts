import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { Router } from 'express'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController'
import uploadConfig from '@config/upload'
import multer from 'multer'

const carsRoutes = Router()

const upload = multer(uploadConfig.upload('./tmp/cars'))

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

carsRoutes.post(
	'/',
	ensureAuthenticated,
	ensureAdmin,
	createCarController.handle,
)

carsRoutes.get('/available', listAvailableCarsController.handle)

carsRoutes.post(
	'/specifications/:id',
	ensureAuthenticated,
	ensureAdmin,
	createCarSpecificationController.handle,
)

carsRoutes.post(
	'/images/:id',
	ensureAuthenticated,
	ensureAdmin,
	upload.array('images'),
	uploadCarImagesController.handle,
)

export { carsRoutes }
