export interface Category {
  _id: string
  category_name: string
  image_category?: string
}
export interface CategoryListState {
  loading: boolean
  success: boolean
  error: boolean
  categories: Category[]
}

const initialState: CategoryListState = {
  loading: false,
  success: false,
  error: false,
  categories: []
}
export interface RootStateExerciseList {
  exerciseList: {
    loading: boolean
    success: boolean
    error: boolean
    categories: Category[]
  }
}
export interface CategoryAction {
  type: string
  payload?: any
}
export { initialState }
