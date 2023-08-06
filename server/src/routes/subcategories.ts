import express from 'express'
import {
  createSubcategory,
  deleteSubcategory,
  getSubcategories,
  getSubcategory,
  updateSubcategory
} from '../controllers/subcategoryController'

const router = express.Router({ mergeParams: true })

router.route('/').post(createSubcategory).get(getSubcategories)
router
  .route('/:id')
  .get(getSubcategory)
  .put(updateSubcategory)
  .delete(deleteSubcategory)

export { router as subcategoryRouter }
