import express from 'express'
import {
  allExercise,
  createExercise,
  deleteExercise,
  getExerciseById,
  updateExercise
} from '../controllers/exerciseController'
const router = express.Router()

router.route('/').get(allExercise).post(createExercise)
router
  .route('/:id')
  .put(updateExercise)
  .get(getExerciseById)
  .delete(deleteExercise)

export { router as exerciseRouter }
