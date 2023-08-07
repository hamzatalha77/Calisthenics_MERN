import {
  EXERCISE_DELETE_FAIL,
  EXERCISE_DELETE_REQUEST,
  EXERCISE_DELETE_SUCCESS,
  EXERCISE_DETAILS_FAIL,
  EXERCISE_DETAILS_REQUEST,
  EXERCISE_DETAILS_SUCCESS,
  EXERCISE_UPDATE_FAIL,
  EXERCISE_UPDATE_REQUEST,
  EXERCISE_UPDATE_RESET,
  EXERCISE_UPDATE_SUCCESS
} from '../constants/ExerciseConstants'
import {
  EXERCISE_CREATE_FAIL,
  EXERCISE_CREATE_REQUEST,
  EXERCISE_CREATE_RESET,
  EXERCISE_CREATE_SUCCESS,
  EXERCISE_LIST_FAIL,
  EXERCISE_LIST_REQUEST,
  EXERCISE_LIST_SUCCESS
} from '../constants/ExerciseConstants'
import { ExerciseAction, initialState } from '../types/exerciseTypes'

const exerciseListReducers = (state = initialState, action: ExerciseAction) => {
  switch (action.type) {
    case EXERCISE_LIST_REQUEST:
      return { ...state, loading: true, exercises: [], error: false }
    case EXERCISE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        exercises: action.payload, // The payload should directly contain the exercises array
        error: false
      }
    case EXERCISE_LIST_FAIL:
      return { ...state, loading: false, exercises: [], error: true }
    default:
      return state
  }
}
const exerciseDetailsReducers = (
  state = { loading: false, success: false, error: false, exercise: {} },
  action: ExerciseAction
) => {
  switch (action.type) {
    case EXERCISE_DETAILS_REQUEST:
      return { ...state, loading: true }
    case EXERCISE_DETAILS_SUCCESS:
      return {
        loading: false,
        exercise: action.payload
      }
    case EXERCISE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
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
const exerciseUpdateReducers = (
  state = { exercise: {} },
  action: ExerciseAction
) => {
  switch (action.type) {
    case EXERCISE_UPDATE_REQUEST:
      return { loading: true }
    case EXERCISE_UPDATE_SUCCESS:
      return { loading: false, success: true, exercise: action.payload }
    case EXERCISE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case EXERCISE_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
const exerciseDeleteReducers = (state = {}, action: ExerciseAction) => {
  switch (action.type) {
    case EXERCISE_DELETE_REQUEST:
      return { loading: true }
    case EXERCISE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case EXERCISE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export {
  exerciseCreateReducers,
  exerciseListReducers,
  exerciseUpdateReducers,
  exerciseDetailsReducers,
  exerciseDeleteReducers
}
