export interface SubcategoryAction {
  type: string
  payload?: any
}
export interface RootStateCategoryCreate {
  categoryCreate: {
    loading: boolean
    success: boolean
    error: boolean
  }
}
