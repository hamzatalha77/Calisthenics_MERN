type Exercise = {
  _id: string
  title: string
  description?: string
  images: string[]
  video?: string
  tags: string[]
  muscles: string[]
  technique?: string
  reps?: number
  sets?: number
  duration?: number
  userOwner: string
}
export interface RootState {
  exerciseList: {
    loading: boolean
    success: boolean
    error: boolean
    exercises: Exercise[]
  }
}
