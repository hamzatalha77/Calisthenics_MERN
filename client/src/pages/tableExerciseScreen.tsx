import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateExerciseDelete, RootStateExerciseList } from '../types/index'
import { deleteExercise, listExercises } from '../actions/exerciseActions'
import { Dispatch } from 'redux'
import { Link } from 'react-router-dom'

const TableExercise = () => {
  const dispatch = useDispatch<Dispatch<any>>()
  const exerciseList = useSelector(
    (state: RootStateExerciseList) => state.exerciseList
  )
  const { loading, error, exercises } = exerciseList

  const exerciseDelete = useSelector(
    (state: RootStateExerciseDelete) => state.exerciseDelete
  )
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = exerciseDelete
  const deleteHandler = (exerciseId: string) => {
    // Call the deleteExercise action with the exerciseId
    dispatch(deleteExercise(exerciseId))
  }
  useEffect(() => {
    dispatch(listExercises())
  }, [dispatch])

  console.log('exercises:', exercises)
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Exercise Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Duration
              </th>
              <th scope="col" className="px-6 py-3">
                Technique
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {exercises?.map((exercise) => (
              <tr
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                key={exercise._id} // Add unique key to each table row
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {exercise.title}
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/edit-exercise/${exercise._id}`}
                    className="font-medium text-green-600 dark:text-green-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteHandler(exercise._id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableExercise
