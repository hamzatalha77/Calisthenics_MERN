import { useEffect, useState, ChangeEvent, FormEvent, useRef } from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootStateCategoryList } from '../../types/categoryTypes'
import {
  RootStateExerciseDetails,
  RootStateExerciseUpdate
} from '../../types/exerciseTypes'
import { listCategories } from '../../actions/categoryActions'
import { EXERCISE_UPDATE_RESET } from '../../constants/ExerciseConstants'
import {
  listExercisesDetails,
  updateExercise
} from '../../actions/exerciseActions'

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

          <div className="border rounded-md p-4 w-full mx-auto max-w-2xl">
            <h4 className="text-xl lg:text-2xl font-semibold">
              Select Your Category
            </h4>

            <div>
              {Array.isArray(categories) &&
                categories.map((category) => (
                  <label
                    key={category._id}
                    className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="Category"
                      value={category.category_name}
                      checked={category._id === exercise.category}
                      onChange={(e) => setCategory(category._id)}
                    />
                    <i className="pl-2">{category.category_name}</i>
                  </label>
                ))}
            </div>
          </div>

          {/* <select
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
          </select> */}

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
