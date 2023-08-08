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
    console.log('Fetching exercise details and categories...')
    dispatch(listCategories())
    if (successUpdate) {
      console.log('Update success, redirecting...')
      dispatch({ type: EXERCISE_UPDATE_RESET })
      navigate('/table-exercise')
    } else {
      if (!exercise.title || exercise._id !== exerciseId) {
        console.log('Fetching exercise details...')
        dispatch(listExercisesDetails(exerciseId))
      } else {
        console.log('Setting exercise details...')
        setTitle(exercise.title)
        setImages(exercise.images || [])
        setCategory(exercise.category)
        console.log('Category set to:', exercise.category)
      }

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
          <button
            id="dropdownRadioButton"
            data-dropdown-toggle="dropdownDefaultRadio"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Dropdown radio
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            id="dropdownDefaultRadio"
            className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownRadioButton"
            >
              <li>
                <div className="flex items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value=""
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Default radio
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Checked state
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <input
                    id="default-radio-3"
                    type="radio"
                    value=""
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="default-radio-3"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Default radio
                  </label>
                </div>
              </li>
            </ul>
          </div>
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {Array.isArray(categories) &&
              categories.map((category) => (
                <option key={category._id} value={category.category_name}>
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
