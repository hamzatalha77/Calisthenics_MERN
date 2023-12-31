import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Dispatch } from 'redux'
import { Link } from 'react-router-dom'
import { RootStateCategoryList } from '../../types/categoryTypes'
import { listCategories } from '../../actions/categoryActions'

const TableCategoryScreen = () => {
  const dispatch = useDispatch<Dispatch<any>>()
  const categoryList = useSelector(
    (state: RootStateCategoryList) => state.categoryList
  )
  const { loading, error, categories } = categoryList

  //   const categoryDelete = useSelector(
  //     (state: RootStateCategoryDelete) => state.categoryDelete
  //   )
  //   const {
  //     loading: loadingDelete,
  //     error: errorDelete,
  //     success: successDelete
  //   } = categoryDelete
  //   const deleteHandler = async (categoryId: string) => {
  //     try {
  //       await dispatch(deleteCategory(categoryId))
  //       dispatch(listCategories())
  //     } catch (error) {
  //       console.error('Error deleting category:', error)
  //     }
  //   }
  useEffect(() => {
    dispatch(listCategories())
  }, [dispatch])

  console.log('categories:', categories)
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
            {categories?.map((category) => (
              <tr
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                key={category._id} // Add unique key to each table row
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {category.category_name}
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">
                  <Link to={`/add-subcategory/${category._id}/subcategories`}>
                    Add Subcategory
                  </Link>
                </td>
                {/* <td className="px-6 py-4">
                  <Link
                    to={`/edit-category/${category._id}`}
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
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableCategoryScreen
