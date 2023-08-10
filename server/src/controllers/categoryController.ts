import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { CategoryModel } from '../models/Categories'
import slugify from 'slugify'
import { singleUpload } from '../middleware/multer'

const getCategories = asyncHandler(async (req: Request, res: Response) => {
  try {
    const category = await CategoryModel.find({})
    res.json(category)
  } catch (error) {
    res.json(error)
  }
})
const getCategoriesWithSubcategories = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const categories = await CategoryModel.find({}).populate('subcategories')

      res.json(categories)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
)
const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await CategoryModel.findById(req.params.id)
  if (category) {
    res.json(category)
  } else {
    res.status(404)
    throw new Error('Category Not Found')
  }
})

const createCategory = async (req: Request, res: Response) => {
  try {
    singleUpload(req, res, async (err: any) => {
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

    singleUpload(req, res, async (err: any) => {
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
const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await CategoryModel.findByIdAndDelete(req.params.id)
  if (category) {
    res.json({ message: 'Category Removed' })
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})
export {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesWithSubcategories,
  getCategory
}
