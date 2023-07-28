import axios from 'axios'
import { Dispatch } from 'redux'
import {
  EXERCISE_CREATE_REQUEST,
  EXERCISE_CREATE_SUCCESS,
  EXERCISE_CREATE_FAIL
} from '../constants/ExerciseConstants'

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
export default createExercise
