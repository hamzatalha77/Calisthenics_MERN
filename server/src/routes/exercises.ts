import express from 'express'
import {
  allExercise,
  createExercise,
  getExerciseById,
  updateExercise
} from '../controllers/exerciseController'

const router = express.Router()

router.route('/').get(allExercise)

router.route('/').post(createExercise)
router.route('/:id').put(updateExercise).get(getExerciseById)

export { router as exerciseRouter }
