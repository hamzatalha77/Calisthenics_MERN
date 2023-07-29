import {
  EXERCISE_CREATE_FAIL,
  EXERCISE_CREATE_REQUEST,
  EXERCISE_CREATE_RESET,
  EXERCISE_CREATE_SUCCESS,
  EXERCISE_LIST_FAIL,
  EXERCISE_LIST_REQUEST,
  EXERCISE_LIST_SUCCESS
} from '../constants/ExerciseConstants'

interface ExerciseAction {
  type: string
  payload?: any
}
const exerciseListReducers = (
  state = { loading: false, exercises: [], error: null },
  action: ExerciseAction
) => {
  switch (action.type) {
    case EXERCISE_LIST_REQUEST:
      return { loading: true, exercises: [], error: null }
    case EXERCISE_LIST_SUCCESS:
      return {
        loading: false,
        exercises: action.payload.exercises,
        error: null
      }
    case EXERCISE_LIST_FAIL:
      return { loading: false, exercises: [], error: action.payload }
    default:
      return state
  }
}

const exerciseCreateReducers = (state = {}, action: ExerciseAction) => {
  switch (action.type) {
    case EXERCISE_CREATE_REQUEST:
      return { loading: true }
    case EXERCISE_CREATE_SUCCESS:
      return { loading: false, success: true, exercise: action.payload }
    case EXERCISE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case EXERCISE_CREATE_RESET:
      return {}
    default:
      return state
  }
}
export { exerciseCreateReducers, exerciseListReducers }
