import express from 'express'
import { Request, Response } from 'express'
import { ExerciseModel } from '../models/Exercises'
import upload from '../middleware/multer'
import { allExercise } from '../controllers/exerciseController'

const router = express.Router()

router.route('/').get(allExercise)

router.post('/', upload, async (req: Request, res: Response) => {
  const fileArray = req.files as Express.Multer.File[]
  if (fileArray) {
    const fileUrls = fileArray.map(
      (file: Express.Multer.File) =>
        `${req.protocol}://${req.get('host')}/${file.path
          .replace('[]', '')
          .replace(/\\/g, '/')}`
    )
    const data = {
      ...req.body,
      images: fileUrls
    } as any
    const exercises = new ExerciseModel(data)
    await exercises.save()
    res.json(exercises)
  } else {
    res.status(400).json({ error: 'No files were uploaded.' })
  }
})
router.put('/:id', upload, async (req: Request, res: Response) => {
  try {
    const updatedData = req.body

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
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while updating the exercise.' })
  }
})
export { router as uploadRouter }
