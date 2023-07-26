import express from 'express'
import {
  allExercise,
  createExercise,
  updateExercise
} from '../controllers/exerciseController'

const router = express.Router()

router.route('/').get(allExercise)

router.route('/').post(createExercise)
router.route('/:id').put(updateExercise)

export { router as exerciseRouter }
