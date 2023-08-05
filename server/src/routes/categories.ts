import express from 'express'
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory
} from '../controllers/categoryController'

const router = express.Router()

router.route('/').post(createCategory).get(getCategories)
router.route('/:id').put(updateCategory).delete(deleteCategory).get(getCategory)

export { router as categoryRouter }
