import { Request, Response, NextFunction } from 'express'
import { ExerciseModel } from '../models/Exercises'
import multer from 'multer'
import path from 'path'

type MulterFile = {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

type MyRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, path.join(process.cwd(), 'uploads'))
  },
  filename: function (req: Request, file: any, cb: any) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const fileFilter = (req: Request, file: any, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'), false)
  }
}

const upload: MyRequestHandler = multer({ storage, fileFilter }).array(
  'images',
  5
)

const allExercise = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await ExerciseModel.find({})
    res.json(response)
  } catch (err) {
    res.json(err)
  }
}

const createExercise = async (req: Request, res: Response): Promise<void> => {
  const exerciseData = req.body

  try {
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      exerciseData.images = req.files.map((file: MulterFile) => file.path)
    } else {
      exerciseData.images = []
    }

    console.log('Exercise Data:', exerciseData)

    const exercise = new ExerciseModel(exerciseData)

    console.log('Saving exercise to the database...')
    const response = await exercise.save()
    console.log('Exercise saved successfully:', response)

    res.json(response)
  } catch (err: unknown) {
    console.error('Error occurred while saving exercise:', err)
    if (err instanceof Error) {
      res
        .status(500)
        .json({ error: 'Internal server error', message: err.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { allExercise, createExercise, upload }
