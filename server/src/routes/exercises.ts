import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { allExercise, createExercise } from '../controllers/exerciseController'

const router = express.Router()

router.route('/').get(allExercise)

router.route('/').post(createExercise)

export { router as exerciseRouter }
