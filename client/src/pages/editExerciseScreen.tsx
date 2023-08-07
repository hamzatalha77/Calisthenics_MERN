import { useEffect, useState, ChangeEvent, FormEvent, useRef } from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { EXERCISE_UPDATE_RESET } from '../constants/ExerciseConstants'
import {
  updateExercise,
  listExercisesDetails
} from '../actions/exerciseActions'
import {
  RootStateExerciseDetails,
  RootStateExerciseUpdate
} from '../types/exerciseTypes'
import { RootStateCategoryList } from '../types/categoryTypes'
import { listCategories } from '../actions/categoryActions'

const EditExercise = ({ match, history }: any) => {
  const { exerciseId } = useParams<{ exerciseId: string }>()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [video, setVideo] = useState<string>('')
  const [muscles, setMuscles] = useState<string>('')
  const [technique, setTechnique] = useState<string>('')
  const [tags, setTags] = useState<string>('')
  const [reps, setReps] = useState<string>('')
  const [sets, setSets] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [images, setImages] = useState<string[]>([])
  const [imagesToUpload, setImagesToUpload] = useState<File[]>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch<Dispatch<any>>()

  const categoryList = useSelector(
    (state: RootStateCategoryList) => state.categoryList
  )
  const { loading: loadingList, error: errorList, categories } = categoryList

  const exerciseDetails = useSelector(
    (state: RootStateExerciseDetails) => state.exerciseDetails
  )
  const { loading, error, exercise } = exerciseDetails

  const exerciseUpdate = useSelector(
    (state: RootStateExerciseUpdate) => state.exerciseUpdate
  )
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = exerciseUpdate

  useEffect(() => {
    dispatch(listCategories())
    if (successUpdate) {
      dispatch({ type: EXERCISE_UPDATE_RESET })
      navigate('/table-exercise')
    } else {
      if (!exercise.title || exercise._id !== exerciseId) {
        dispatch(listExercisesDetails(exerciseId))
      } else {
        setTitle(exercise.title)
        setImages(exercise.images || [])
        setCategory(exercise.category)
        console.log('Category set to:', exercise.category)
      }
      // Reset category when exercise details are loaded
      setCategory('')
    }
  }, [dispatch, exerciseId, successUpdate, exercise, history])

  const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target as HTMLInputElement
    console.log(e.target.files)
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const filesArray: File[] = Array.from(fileInput.files)
      const _images: string[] = []

      filesArray.forEach((file, index) => {
        _images.push(URL.createObjectURL(file))
        console.log(file.name)
      })
      setImages(_images)
      setImagesToUpload(filesArray)
    }
  }
  const deleteImage = (index: number) => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    setImages(updatedImages)

    const updatedImagesToUpload = imagesToUpload ? [...imagesToUpload] : []
    updatedImagesToUpload.splice(index, 1)
    setImagesToUpload(updatedImagesToUpload)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      updateExercise({
        _id: exerciseId,
        title,
        images: imagesToUpload,
        category
      })
    )
    setImagesToUpload(undefined)
    setImages([])
  }
  return (
    <div>
      <h1>Edit Exercise</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <div className="theimage">
            {images.map((imagePath, index) => (
              <div key={index}>
                <img
                  src={imagePath}
                  alt="Uploaded"
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover'
                  }}
                />
                <button
                  type="button"
                  onClick={() => deleteImage(index)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <label
            htmlFor="categories"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an option
          </label>
          <select
            id="categories"
            defaultValue={category} // Make sure category is a valid value from the Redux store
            onChange={(e) => setCategory(e.target.value)}
          >
            {Array.isArray(categories) &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category_name}
                </option>
              ))}
          </select>

          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="multiple_files"
          >
            Upload multiple files
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="multiple_files"
            type="file"
            multiple
            onChange={uploadFileHandler}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default EditExercise
