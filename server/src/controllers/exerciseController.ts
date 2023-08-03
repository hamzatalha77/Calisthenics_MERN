import { Request, Response } from 'express'
import { ExerciseModel } from '../models/Exercises'
import asyncHandler from 'express-async-handler'
import slugify from 'slugify'

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

const createExercise = asyncHandler(async (req, res) => {
  try {
    const exercise = new ExerciseModel({
      title: req.body.title,
      slug: slugify(req.body.title),
      description: req.body.description,
      images: req.body.images,
      video: req.body.video,
      tags: req.body.tags,
      muscles: req.body.muscles,
      technique: req.body.technique,
      reps: req.body.reps,
      sets: req.body.sets,
      duration: req.body.duration,
      userOwner: req.body.userOwner
    })
    console.log(req.body.images)
    const createExercise = await exercise.save()
    res.status(201).json(createExercise)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
})
// const createExercise = asyncHandler(async (req, res) => {
//   const exercise = new ExerciseModel({
//     title: 'Exercise Title',
//     description: 'Exercise Description',
//     images: ['image_url_1', 'image_url_2'],
//     video: 'video_url_here',
//     tags: ['tag1', 'tag2'],
//     muscles: ['muscle1', 'muscle2'],
//     technique: 'Exercise Technique',
//     reps: 0,
//     sets: 0,
//     duration: 0,
//     userOwner: 'user_id_here'
//   })
//   const createExercise = await exercise.save()
//   res.status(201).json(createExercise)
// })

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
