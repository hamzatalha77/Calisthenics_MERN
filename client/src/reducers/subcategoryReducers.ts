import {
  SUBCATEGORY_CREATE_REQUEST,
  SUBCATEGORY_CREATE_SUCCESS,
  SUBCATEGORY_CREATE_FAIL,
  SUBCATEGORY_CREATE_RESET
} from '../constants/SubcategoryConstants'
import { SubcategoryAction } from '../types/subcategoryTypes'

const subcategoryCreateReducers = (state = {}, action: SubcategoryAction) => {
  switch (action.type) {
    case SUBCATEGORY_CREATE_REQUEST:
      return { loading: true, error: false }
    case SUBCATEGORY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        subcategory: action.payload,
        error: false
      }
    case SUBCATEGORY_CREATE_FAIL:
      return {
        loading: false,
        error: true
      }
    case SUBCATEGORY_CREATE_RESET:
      return {}
    default:
      return state
  }
}
export { subcategoryCreateReducers }
