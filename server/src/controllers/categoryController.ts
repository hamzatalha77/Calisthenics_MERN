import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { CategoryModel } from '../models/Category'
import slugify from 'slugify'

const getCategories = asyncHandler(async (req: Request, res: Response) => {
  try {
    const response = await CategoryModel.find({})
    res.json(response)
  } catch (error) {
    res.json(error)
  }
})
const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const name = req.body.name
  const image_category = req.body.image_category
  CategoryModel.create({ name, image_category, slug: slugify(name) })
    .then((category) => res.status(201).json({ data: category }))
    .catch((err) => res.status(400).send(err))
})
export { getCategories, createCategory }
