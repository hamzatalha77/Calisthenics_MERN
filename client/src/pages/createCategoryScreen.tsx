import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Dispatch } from 'redux'
import { RootStateCategoryCreate } from '../types/categoryTypes'
import { CATEGORY_CREATE_RESET } from '../constants/CategoryConstants'
import { createCategory } from '../actions/categoryActions'

const CreateCategoryScreen = () => {
  const [category_name, setCategory_name] = useState<string>('')
  const [image_category, setImage_category] = useState<File | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch<Dispatch<any>>()

  const categoryCreate = useSelector(
    (state: RootStateCategoryCreate) => state.categoryCreate
  )
  const { success: successCreate, error: errorCreate } = categoryCreate
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: CATEGORY_CREATE_RESET })
      navigate('/')
    }
  }, [dispatch, successCreate, errorCreate, navigate])

  const uploadFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target as HTMLInputElement
    if (fileInput.files && fileInput.files.length > 0) {
      setImage_category(fileInput.files[0])
    }
  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('category_name', category_name)
    if (image_category) {
      formData.append('image_category', image_category)
    }

    dispatch(createCategory(formData))
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="relative mb-3" data-te-input-wrapper-init>
        <input
          type="text"
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          id="exampleFormControlInput2"
          placeholder="Form control lg"
          onChange={(e) => setCategory_name(e.target.value)}
        />
        <label
          htmlFor="exampleFormControlInput2"
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >
          Form control lg
        </label>
      </div>
      <div className="mb-3">
        <label
          htmlFor="formFile"
          className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
        >
          Default file input example
        </label>
        <input
          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
          type="file"
          id="formFile"
          onChange={uploadFileHandler}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default CreateCategoryScreen
