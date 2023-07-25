const mongoose = require('mongoose')

const exercisesSchema = new mongoose.Schema({
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
        type: String // Assuming you're storing image URLs in the array
      }
    ],
    default: [] // Set an empty array as the default value
  },
  video: {
    type: String // Assuming you're storing the video URL as a string
  },
  tags: {
    type: [String], // An array of strings for tags
    default: [] // Set an empty array as the default value
  },
  muscles: {
    type: [String], // An array of strings for muscles worked
    default: [] // Set an empty array as the default value
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
    type: Number // Duration in minutes or seconds, depending on your use case
  }
})

const Exercises = mongoose.model('Exercises', exercisesSchema)

module.exports = Exercises
