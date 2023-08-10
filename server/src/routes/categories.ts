import express from 'express'
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoriesWithSubcategories,
  getCategory,
  updateCategory
} from '../controllers/categoryController'
import { subcategoryRouter } from './subcategories'

const router = express.Router()

router.route('/').post(createCategory).get(getCategoriesWithSubcategories)
router.route('/:id').put(updateCategory).delete(deleteCategory).get(getCategory)
router.use('/:categoryId/subcategories', subcategoryRouter)

export { router as categoryRouter }
