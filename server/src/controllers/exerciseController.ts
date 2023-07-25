import { Request, Response, NextFunction } from 'express'
import { ExerciseModel } from '../models/Exercises'
import multer from 'multer'

// Define types explicitly for Multer and NextFunction
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
    cb(null, 'uploads/') // Set the destination folder where uploaded images will be stored
  },
  filename: function (req: Request, file: any, cb: any) {
    // Generate a unique filename for each uploaded image
    cb(null, new Date().toISOString() + file.originalname)
  }
})

// Specify allowed file types using fileFilter option
const fileFilter = (req: Request, file: any, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'), false)
  }
}

// Use MyRequestHandler instead of RequestHandler
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

  // Check if req.files exists and contains uploaded files
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    exerciseData.images = req.files.map((file: MulterFile) => file.path)
  } else {
    exerciseData.images = [] // Set an empty array if no images were uploaded
  }

  const exercise = new ExerciseModel(exerciseData)
  try {
    const response = await exercise.save()
    res.json(response)
  } catch (err) {
    res.json(err)
  }
}

export { allExercise, createExercise, upload }
