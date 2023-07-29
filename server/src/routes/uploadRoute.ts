import express from 'express'
import { Request, Response } from 'express'
import { ExerciseModel } from '../models/Exercises'
import upload from '../middleware/multer'

const router = express.Router()

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

export { router as uploadRouter }
