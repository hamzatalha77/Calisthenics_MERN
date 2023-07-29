import axios from 'axios'
import { Dispatch } from 'redux'
import {
  EXERCISE_CREATE_REQUEST,
  EXERCISE_CREATE_SUCCESS,
  EXERCISE_CREATE_FAIL,
  EXERCISE_LIST_REQUEST,
  EXERCISE_LIST_SUCCESS,
  EXERCISE_LIST_FAIL
} from '../constants/ExerciseConstants'

const listExercises = () => async (dispatch: Dispatch) => {
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

const createExercise = (exercise: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: EXERCISE_CREATE_REQUEST })
    const { data } = await axios.post(`/api/upload`, exercise, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
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
export { createExercise, listExercises }
