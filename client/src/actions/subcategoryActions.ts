import axios from 'axios'
import {
  SUBCATEGORY_CREATE_REQUEST,
  SUBCATEGORY_CREATE_SUCCESS,
  SUBCATEGORY_CREATE_FAIL
} from '../constants/SubcategoryConstants'
import { SubcategoryAction } from '../types/subcategoryTypes'

const createSubcategory =
  (category_id: string, subcategory: any) =>
  async (dispatch: (action: SubcategoryAction) => void) => {
    try {
      dispatch({ type: SUBCATEGORY_CREATE_REQUEST })
      const { data } = await axios.post(
        `/api/categories/${category_id}/subcategories`,
        subcategory
      )
      dispatch({ type: SUBCATEGORY_CREATE_SUCCESS, payload: data })
    } catch (error: any) {
      console.error(error)
      dispatch({
        type: SUBCATEGORY_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export { createSubcategory }
