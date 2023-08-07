import axios from 'axios'
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL
} from '../constants/CategoryConstants'
import { CategoryAction } from '../types/categoryTypes'

const listCategories =
  () => async (dispatch: (action: CategoryAction) => void) => {
    try {
      dispatch({ type: CATEGORY_LIST_REQUEST })
      const data = await axios.get('/api/categories')
      console.log(data)
      dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data })
    } catch (error: any) {
      dispatch({
        type: CATEGORY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export { listCategories }
