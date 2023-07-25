import mongoose from 'mongoose'

const exerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [
      {
        type: String
      }
    ],
    default: []
  },
  video: {
    type: String
  },
  tags: {
    type: [String],
    default: []
  },
  muscles: {
    type: [String],
    default: []
  },
  technique: {
    type: String
  },
  reps: {
    type: Number
  },
  sets: {
    type: Number
  },
  duration: {
    type: Number
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
})

export const ExerciseModel = mongoose.model('Exercises', exerciseSchema)
