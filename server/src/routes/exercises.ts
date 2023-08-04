import express from 'express'
import {
  allExercise,
  // createExercise,
  deleteExercise,
  getExerciseById
  // updateExercise
} from '../controllers/exerciseController'

const router = express.Router()

router.route('/').get(allExercise)

// router.route('/').post(createExercise)
router
  .route('/:id')

  .get(getExerciseById)
  .delete(deleteExercise)

export { router as exerciseRouter }
