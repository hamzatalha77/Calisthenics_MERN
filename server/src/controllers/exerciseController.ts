import { Request, Response } from 'express'
import { ExerciseModel } from '../models/Exercises'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dodxmvtfr',
  api_key: '643979424287564',
  api_secret: '3V_VXb4vQCJdvLRoKJyOKntBT8E'
})

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
      const imagePromises = req.files.map((file: MulterFile) =>
        cloudinary.uploader.upload(file.path)
      )
      const uploadedImages = await Promise.all(imagePromises)

      exerciseData.images = uploadedImages.map((image: any) => image.secure_url)
    } else {
      exerciseData.images = []
    }

    const exercise = new ExerciseModel(exerciseData)

    const response = await exercise.save()
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

export { allExercise, createExercise }
