import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Dispatch } from 'redux'
import { createSubcategory } from '../actions/subcategoryActions'

const CreateSubcategoryScreen = () => {
  const { category_id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<Dispatch<any>>()

  const [subcategory_name, setSubcategory_name] = useState<string>('')

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!category_id) {
      console.error('Category ID is missing.')
      return
    }

    const subcategory = {
      subcategory_name
    }

    dispatch(createSubcategory(category_id, subcategory))
    navigate(`/table-category`)
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={subcategory_name}
        onChange={(e) => setSubcategory_name(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default CreateSubcategoryScreen
