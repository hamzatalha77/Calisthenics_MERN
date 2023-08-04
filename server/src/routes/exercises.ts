import express from 'express'
import {
  allExercise,
  createExercise,
  deleteExercise,
  getExerciseById,
  updateExercise
} from '../controllers/exerciseController'
import upload from '../middleware/multer'

const router = express.Router()

router.route('/').get(allExercise).post(upload, createExercise)
router
  .route('/:id')
  .put(upload, updateExercise)
  .get(getExerciseById)
  .delete(deleteExercise)

export { router as exerciseRouter }
