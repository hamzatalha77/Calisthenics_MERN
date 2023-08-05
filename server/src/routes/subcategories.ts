import express from 'express'
import {
  createSubcategory,
  getSubcategories,
  getSubcategory
} from '../controllers/subcategoryController'

const router = express.Router()

router.route('/').post(createSubcategory).get(getSubcategories)
router.route('/:id').get(getSubcategory)

export { router as subcategoryRouter }
