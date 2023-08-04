import express from 'express'
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory
} from '../controllers/categoryController'

const router = express.Router()

router.route('/').post(createCategory).get(getCategories)
router.route('/:id').put(updateCategory).delete(deleteCategory)

export { router as categoryRouter }
