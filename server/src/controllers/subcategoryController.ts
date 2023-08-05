import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { SubCategoryModel } from '../models/SubCategories'
import slugify from 'slugify'

const getSubcategories = asyncHandler(async (req: Request, res: Response) => {
  try {
    const subcategory = await SubCategoryModel.find({})
    res.json(subcategory)
  } catch (error) {
    res.json(error)
  }
})

const getSubcategory = asyncHandler(async (req: Request, res: Response) => {
  const subcategory = await SubCategoryModel.findById(req.params.id)
  if (subcategory) {
    res.json(subcategory)
  } else {
    res.status(404)
    throw new Error('Category Not Found')
  }
})

const createSubcategory = asyncHandler(async (req: Request, res: Response) => {
  try {
    const subcategory = new SubCategoryModel({
      subcategory_name: req.body.subcategory_name,
      slug: slugify(req.body.subcategory_name),
      category: req.body.category
    })
    await subcategory.save()
    res.status(201).json({ data: subcategory })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

const updateSubcategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const { subcategory_name, category } = req.body
  const subcategory = await SubCategoryModel.findOneAndUpdate(
    { _id: id },
    { subcategory_name, slug: slugify(subcategory_name), category },
    { new: true }
  )
  if (!subcategory) {
    res.status(404).json({ message: 'Subcategory Not Found' })
  }
  res.status(201).json({ data: subcategory })
})

const deleteSubcategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  const subcategory = await SubCategoryModel.findOneAndDelete({ _id: id })
  if (!subcategory) {
    res.status(404).json({ message: 'Subcategory Not Found' })
  }
  res.status(201).json({ message: 'Subcategory has been deleted !!' })
})

export {
  createSubcategory,
  getSubcategories,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory
}
