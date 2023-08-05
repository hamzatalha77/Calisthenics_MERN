import { Request, Response } from 'express'
import { ExerciseModel } from '../models/Exercises'
import asyncHandler from 'express-async-handler'
import slugify from 'slugify'
import { multipleUpload } from '../middleware/multer'

const allExercise = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await ExerciseModel.find({})
      res.json(response)
    } catch (err) {
      res.json(err)
    }
  }
)
const getExerciseById = asyncHandler(async (req, res) => {
  const exercise = await ExerciseModel.findById(req.params.id)
  if (exercise) {
    res.json(exercise)
  } else {
    res.status(404)
    throw new Error('Exercise Not Found')
  }
})
const createExercise = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      multipleUpload(req, res, async (err: any) => {
        if (err) {
          return res.status(400).json({ error: err.message })
        }

        const fileArray = req.files as Express.Multer.File[]

        if (!fileArray || fileArray.length === 0) {
          return res.status(400).json({ error: 'No files were uploaded.' })
        }

        const fileUrls = fileArray.map(
          (file: Express.Multer.File) =>
            `${req.protocol}://${req.get('host')}/${file.path
              .replace('[]', '')
              .replace(/\\/g, '/')}`
        )

        const data = {
          ...req.body,
          slug: slugify(req.body.title),
          images: fileUrls
        } as any

        const exercises = new ExerciseModel(data)
        await exercises.save()
        res.json(exercises)
      })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
)
const updateExercise = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      multipleUpload(req, res, async (err: any) => {
        if (err) {
          return res.status(400).json({ error: err.message })
        }

        const updatedData = { ...req.body, slug: slugify(req.body.title) }
        const exercise = await ExerciseModel.findById(req.params.id)

        if (!exercise) {
          return res.status(404).json({ error: 'Exercise not found.' })
        }

        if (Array.isArray(req.files) && req.files.length > 0) {
          const fileArray = req.files as Express.Multer.File[]
          const fileUrls = fileArray.map(
            (file: Express.Multer.File) =>
              `${req.protocol}://${req.get('host')}/${file.path
                .replace('[]', '')
                .replace(/\\/g, '/')}`
          )
          updatedData.images = fileUrls
        }

        exercise.set(updatedData)
        await exercise.save()
        res.json(exercise)
      })
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred while updating the exercise.' })
    }
  }
)

const deleteExercise = asyncHandler(async (req: Request, res: Response) => {
  const exercise = await ExerciseModel.findByIdAndDelete(req.params.id)
  if (exercise) {
    res.json({ message: 'Exercise Removed' })
  } else {
    res.status(404)
    throw new Error('Exercise not found')
  }
})

export {
  allExercise,
  createExercise,
  updateExercise,
  getExerciseById,
  deleteExercise
}
