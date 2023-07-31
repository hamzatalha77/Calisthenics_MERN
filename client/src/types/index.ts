export interface ExerciseAction {
  type: string
  payload?: any
}

export interface Exercise {
  _id: string
  title: string
  images?: string[]
}

export interface ExerciseListState {
  loading: boolean
  success: boolean
  error: boolean
  exercises: Exercise[]
}

const initialState: ExerciseListState = {
  loading: false,
  success: false,
  error: false,
  exercises: []
}
export interface RootStateExerciseList {
  exerciseList: {
    loading: boolean
    success: boolean
    error: boolean
    exercises: Exercise[]
  }
}
export interface RootStateExerciseDetails {
  exerciseDetails: {
    loading: boolean
    success: boolean
    error: boolean
    exercise: Exercise
  }
}
export interface RootStateExerciseCreate {
  exerciseCreate: {
    loading: boolean
    success: boolean
    error: boolean
  }
}
export interface RootStateExerciseUpdate {
  exerciseUpdate: {
    loading: boolean
    success: boolean
    error: boolean
  }
}
export { initialState }
