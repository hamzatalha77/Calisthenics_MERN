import express from 'express'
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory
} from '../controllers/categoryController'
import { subcategoryRouter } from './subcategories'

const router = express.Router()

router.route('/').post(createCategory).get(getCategories)
router.route('/:id').put(updateCategory).delete(deleteCategory).get(getCategory)
router.use('/:categoryId/subcategories', subcategoryRouter)

export { router as categoryRouter }
