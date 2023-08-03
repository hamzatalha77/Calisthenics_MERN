import { Request, Response, NextFunction, Express } from 'express'
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

const createCategory = async (req: Request, res: Response) => {
  try {
    // Process the uploaded image using the multer middleware
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
        image_category: req.file.path // Use req.file.path to get the path of the uploaded image
      })

      const createdCategory = await category.save()
      res.status(201).json(createdCategory)
    })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export { getCategories, createCategory, uploadcategory }
