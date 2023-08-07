import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL
} from '../constants/CategoryConstants'
import { CategoryAction, initialState } from '../types/categoryTypes'

const categoryListReducers = (state = initialState, action: CategoryAction) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { ...state, loading: true, categories: [], error: false }
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        categories: action.payload,
        error: false
      }
    case CATEGORY_LIST_FAIL:
      return {
        ...state,
        loading: false,
        categories: [],
        error: true
      }
    default:
      return state
  }
}
export { categoryListReducers }
