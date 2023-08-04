import express from 'express'
import {
  createCategory,
  getCategories,
  updateCategory
} from '../controllers/categoryController'

const router = express.Router()

router.route('/').post(createCategory).get(getCategories)
router.route('/:id').put(updateCategory)

export { router as categoryRouter }
