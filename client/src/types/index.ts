interface ExerciseAction {
  type: string
  payload?: any
}
interface Exercise {
  _id: string
  title: string
}

interface ExerciseListState {
  loading: boolean
  success: boolean
  error: boolean
  exercises: Exercise[]
}

export const initialState: ExerciseListState = {
  loading: false,
  success: false,
  error: false,
  exercises: []
}
export interface RootState {
  exerciseList: {
    loading: boolean
    success: boolean
    error: boolean
    exercises: Exercise[]
  }
}
