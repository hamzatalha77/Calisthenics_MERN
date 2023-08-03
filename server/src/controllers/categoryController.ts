import { Request, Response } from 'express'
import path from 'path'
import multer from 'multer'
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
  try {
    const category = new CategoryModel({
      category_name: req.body.category_name,
      slug: slugify(req.body.category_name),
      image_category: req.body.image_category
    })
    const createdCategory = await category.save()
    res.status(201).json(createdCategory)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
})

const storage = multer.diskStorage({
  destination(req: Request, file: any, cb: any) {
    cb(null, 'uploads/')
  },
  filename(req: Request, file: any, cb: any) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  }
})

function checkFileType(file: any, cb: any) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const uploadcategory = multer({
  storage,
  fileFilter: function (req: Request, file: any, cb: any) {
    checkFileType(file, cb)
  }
})

export { getCategories, createCategory, uploadcategory }
