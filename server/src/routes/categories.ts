import express from 'express'
import {
  createCategory,
  getCategories
} from '../controllers/categoryController'

const router = express.Router()

router.route('/').post(createCategory).get(getCategories)

export { router as categoryRouter }
