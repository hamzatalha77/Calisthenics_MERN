import express from 'express'
import { createSubcategory } from '../controllers/subcategoryController'

const router = express.Router()

router.route('/').post(createSubcategory)

export { router as subcategoryRouter }
