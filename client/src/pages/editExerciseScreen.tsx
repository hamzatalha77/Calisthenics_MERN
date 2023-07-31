import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { EXERCISE_UPDATE_RESET } from '../constants/ExerciseConstants'
import {
  updateExercise,
  listExercisesDetails
} from '../actions/exerciseActions'
import { RootStateExerciseDetails, RootStateExerciseUpdate } from '../types'

const EditExercise = ({ match, history }: any) => {
  const { exerciseId } = useParams<{ exerciseId: string }>()
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
    (state: RootStateExerciseDetails) => state.exerciseDetails
  )
  const { loading, error, exercise } = exerciseDetails

  const exerciseUpdate = useSelector(
    (state: RootStateExerciseUpdate) => state.exerciseUpdate
  )
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = exerciseUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: EXERCISE_UPDATE_RESET })
      history.push('/table-exercise')
    } else {
      if (!exercise.title || exercise._id !== exerciseId) {
        dispatch(listExercisesDetails(exerciseId))
      } else {
        setTitle(exercise.title)
        setImages(exercise.images || [])
      }
    }
  }, [dispatch, exerciseId, successUpdate, exercise, history])

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      updateExercise({
        _id: exerciseId,
        title
      })
    )
  }
  return (
    <div>
      <h1>Edit Exercise</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default EditExercise
