import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { SubCategoryModel } from '../models/SubCategory'
import slugify from 'slugify'

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

export { createSubcategory }
