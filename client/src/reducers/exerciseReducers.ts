import {
  EXERCISE_CREATE_FAIL,
  EXERCISE_CREATE_REQUEST,
  EXERCISE_CREATE_RESET,
  EXERCISE_CREATE_SUCCESS
} from '../constants/ExerciseConstants'

interface ExerciseAction {
  type: string
  payload?: any
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
export default exerciseCreateReducers
