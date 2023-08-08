import axios from 'axios'
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL
} from '../constants/CategoryConstants'
import { CategoryAction } from '../types/categoryTypes'

const listCategories =
  () => async (dispatch: (action: CategoryAction) => void) => {
    try {
      dispatch({ type: CATEGORY_LIST_REQUEST })
      const data = await axios.get('/api/categories')
      console.log(data)
      dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data.data })
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
const createCategory =
  (category: any) => async (dispatch: (action: CategoryAction) => void) => {
    try {
      dispatch({ type: CATEGORY_CREATE_REQUEST })
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const { data } = await axios.post('/api/categories', category, config)
      dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data })
    } catch (error: any) {
      dispatch({
        type: CATEGORY_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }
export { listCategories, createCategory }
