import { Request, Response } from 'express'
import { ExerciseModel } from '../models/Exercises'
import asyncHandler from 'express-async-handler'

const allExercise = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await ExerciseModel.find({})
    res.json(response)
  } catch (err) {
    res.json(err)
  }
}

const createExercise = asyncHandler(async (req, res) => {
  const exercise = new ExerciseModel({
    title: 'Exercise Title',
    description: 'Exercise Description',
    images: ['image_url_1', 'image_url_2'],
    video: 'video_url_here',
    tags: ['tag1', 'tag2'],
    muscles: ['muscle1', 'muscle2'],
    technique: 'Exercise Technique',
    reps: 0,
    sets: 0,
    duration: 0,
    userOwner: 'user_id_here'
  })
  const createExercise = await exercise.save()
  res.status(201).json(createExercise)
})

const updateExercise = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    images,
    video,
    tags,
    muscles,
    technique,
    reps,
    sets,
    duration,
    userOwner
  } = req.body

  const exercise = await ExerciseModel.findById(req.params.id)
  if (exercise) {
    exercise.title = title
    exercise.description = description
    exercise.images = images
    exercise.video = video
    exercise.tags = tags
    exercise.muscles = muscles
    exercise.technique = technique
    exercise.reps = reps
    exercise.sets = sets
    exercise.duration = duration
    exercise.userOwner = userOwner
    const updateExercise = await exercise.save()
    res.status(201).json(updateExercise)
  } else {
    res.status(404)
    throw new Error('Resource not found')
  }
})

export { allExercise, createExercise, updateExercise }
