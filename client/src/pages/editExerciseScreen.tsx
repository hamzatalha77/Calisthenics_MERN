import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { EXERCISE_CREATE_RESET } from '../constants/ExerciseConstants'
import {
  updateExercise,
  listExercisesDetails
} from '../actions/exerciseActions'
interface Exercise {
  title: string
  // other properties of the exercise object...
}

interface RootState {
  exerciseDetails: {
    loading: boolean
    success: boolean
    error: boolean
    exercise: Exercise
  }
}
const EditExercise = ({ match, history }: any) => {
  const { id } = useParams<{ id: string }>()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [video, setVideo] = useState<string>('')
  const [muscles, setMuscles] = useState<string>('')
  const [technique, setTechnique] = useState<string>('')
  const [tags, setTags] = useState<string>('')
  const [reps, setReps] = useState<string>('')
  const [sets, setSets] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const [images, setImages] = useState<string[]>([])
  const [imagesToUpload, setImagesToUpload] = useState<File[]>()
  const navigate = useNavigate()
  const dispatch = useDispatch<Dispatch<any>>()

  const exerciseDetails = useSelector(
    (state: RootState) => state.exerciseDetails
  )
  const { loading, error, exercise } = exerciseDetails

  useEffect(() => {
    dispatch(listExercisesDetails(id))
  }, [dispatch, id])

  return (
    <div>
      <h1>Edit Exercise</h1>
      <div>
        {loading ? 'Loading...' : error ? 'Error occurred.' : exercise.title}
      </div>
      {/* ... other input fields and form logic ... */}
    </div>
  )
}

export default EditExercise
