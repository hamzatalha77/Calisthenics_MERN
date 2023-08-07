import mongoose from 'mongoose'

const exerciseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
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
      ref: 'users'
    },
    slug: {
      type: String,
      lowercase: true
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'categories',
      required: [true, 'Exercise must be belong to category']
    },
    subcategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'subcategories'
      }
    ]
  },
  { timestamps: true }
)

export const ExerciseModel = mongoose.model('Exercises', exerciseSchema)
