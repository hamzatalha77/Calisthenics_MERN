import express from 'express'
import {
  allExercise,
  createExercise,
  upload
} from '../controllers/exerciseController'
const router = express.Router()

router.route('/').get(allExercise)
router.route('/').post(upload, createExercise)

export { router as exerciseRouter }
