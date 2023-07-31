import axios from 'axios'
import {
  EXERCISE_CREATE_REQUEST,
  EXERCISE_CREATE_SUCCESS,
  EXERCISE_CREATE_FAIL,
  EXERCISE_LIST_REQUEST,
  EXERCISE_LIST_SUCCESS,
  EXERCISE_LIST_FAIL,
  EXERCISE_UPDATE_REQUEST,
  EXERCISE_UPDATE_SUCCESS,
  EXERCISE_UPDATE_FAIL,
  EXERCISE_DETAILS_REQUEST,
  EXERCISE_DETAILS_SUCCESS,
  EXERCISE_DETAILS_FAIL
} from '../constants/ExerciseConstants'
import { ExerciseAction } from '../types'

const listExercises =
  () => async (dispatch: (action: ExerciseAction) => void) => {
    try {
      dispatch({ type: EXERCISE_LIST_REQUEST })

      const { data } = await axios.get('/api/exercises')

      dispatch({ type: EXERCISE_LIST_SUCCESS, payload: data })

      console.log(data)
    } catch (error: any) {
      console.error(error)
      dispatch({
        type: EXERCISE_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }
const listExercisesDetails =
  (id: any) => async (dispatch: (action: ExerciseAction) => void) => {
    try {
      dispatch({ type: EXERCISE_DETAILS_REQUEST })

      const { data } = await axios.get(`/api/exercises/${id}`)

      dispatch({ type: EXERCISE_DETAILS_SUCCESS, payload: data })

      console.log(data)
    } catch (error: any) {
      console.error(error)
      dispatch({
        type: EXERCISE_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

const createExercise =
  (exercise: any) => async (dispatch: (action: ExerciseAction) => void) => {
    try {
      dispatch({ type: EXERCISE_CREATE_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const { data } = await axios.post(`/api/upload`, exercise, config)

      dispatch({ type: EXERCISE_CREATE_SUCCESS, payload: data })
    } catch (error: any) {
      console.error(error)
      dispatch({
        type: EXERCISE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }
const updateExercise =
  (exercise: any) => async (dispatch: (action: ExerciseAction) => void) => {
    try {
      dispatch({ type: EXERCISE_UPDATE_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.put(
        `/api/upload/${exercise._id}`,
        exercise,
        config
      )

      dispatch({ type: EXERCISE_UPDATE_SUCCESS, payload: data })
    } catch (error: any) {
      console.error(error)
      dispatch({
        type: EXERCISE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }
export { createExercise, listExercises, updateExercise, listExercisesDetails }
