import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { ExerciseModel } from '../models/Exercises'

const createExercise = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await ExerciseModel.find({})
    } catch (err) {
      res.json(err)
    }
  }
)
