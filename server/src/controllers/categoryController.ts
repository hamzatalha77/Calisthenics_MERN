import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { CategoryModel } from '../models/Category'
import slugify from 'slugify'
import { uploadcategory } from '../middleware/categoryMulter'

const getCategories = asyncHandler(async (req: Request, res: Response) => {
  try {
    const response = await CategoryModel.find({})
    res.json(response)
  } catch (error) {
    res.json(error)
  }
})

const createCategory = async (req: Request, res: Response) => {
  try {
    uploadcategory.single('image_category')(req, res, async (err: any) => {
      if (err) {
        return res.status(400).json({ message: err.message })
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' })
      }

      const category = new CategoryModel({
        category_name: req.body.category_name,
        slug: slugify(req.body.category_name),
        image_category: req.file.path
      })

      const createdCategory = await category.save()
      res.status(201).json(createdCategory)
    })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id

    const category = await CategoryModel.findById(categoryId)

    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }

    uploadcategory.single('image_category')(req, res, async (err: any) => {
      if (err) {
        return res.status(400).json({ message: err.message })
      }

      category.category_name = req.body.category_name || category.category_name
      category.slug = slugify(req.body.category_name || category.category_name)
      if (req.file) {
        category.image_category = req.file.path
      }

      const updatedCategory = await category.save()
      res.status(200).json(updatedCategory)
    })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
export { getCategories, createCategory, uploadcategory, updateCategory }
