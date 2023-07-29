import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { EXERCISE_CREATE_RESET } from '../constants/ExerciseConstants'
import { createExercise } from '../actions/exerciseActions'

interface RootState {
  exerciseCreate: {
    loading: boolean
    success: boolean
    error: boolean
  }
}

const CreateExerciseScreen = () => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [video, setVideo] = useState<string>('')
  const [muscles, setMuscles] = useState<string>('')
  const [technique, setTechnique] = useState<string>('')
  const [tags, setTags] = useState<string>('')
  const [reps, setReps] = useState<string>('')
  const [sets, setSets] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const [images, setImages] = useState<string[]>([])
  const [imagesToUpload, setImagesToUpload] = useState<File[]>()
  const navigate = useNavigate()
  const dispatch = useDispatch<Dispatch<any>>()

  const exerciseCreate = useSelector((state: RootState) => state.exerciseCreate)

  const { success: successCreate, error: errorCreate } = exerciseCreate

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: EXERCISE_CREATE_RESET })
      navigate('/saved-exercise')
    }
  }, [dispatch, successCreate, errorCreate, navigate])

  const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target as HTMLInputElement
    console.log(e.target.files)
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const filesArray: File[] = Array.from(fileInput.files)
      const _images: File[] = []
      filesArray.forEach((file, index) => {
        _images.push(file)
      })
      setImagesToUpload(_images)
    }
  }
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      createExercise({
        title,
        description,
        images: imagesToUpload,
        video,
        tags,
        muscles,
        technique,
        reps,
        sets,
        duration
      })
    )
  }

  return (
    <div>
      <h1>CreateExercise</h1>

      <form onSubmit={submitHandler}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              title
            </label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              description
            </label>
            <input
              type="text"
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <div>
              {/* Display the selected images */}
              {images.map((imagePath) => (
                <img
                  key={imagePath}
                  src={imagePath}
                  alt="Uploaded"
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover'
                  }}
                />
              ))}
            </div>
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
          <div>
            <label
              htmlFor="video"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              video
            </label>
            <input
              type="text"
              id="video"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="video..."
              value={video}
              onChange={(e) => setVideo(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              tags
            </label>
            <input
              type="text"
              id="tags"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="muscles"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              muscles
            </label>
            <input
              type="text"
              id="muscles"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="muscles"
              value={muscles}
              onChange={(e) => setMuscles(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="technique"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              technique
            </label>
            <input
              type="text"
              id="technique"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="technique"
              value={technique}
              onChange={(e) => setTechnique(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="reps"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            reps
          </label>
          <input
            type="text"
            id="reps"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="sets"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            sets
          </label>
          <input
            type="text"
            id="sets"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="duration"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            duration
          </label>
          <input
            type="text"
            id="duration"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default CreateExerciseScreen
