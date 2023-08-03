import express from 'express'
import { Request, Response } from 'express'
import { uploadcategory } from '../controllers/categoryController'

const router = express.Router()

router.post(
  '/',
  uploadcategory.single('image_category'),
  (req: Request, res: Response) => {
    if (req.file) {
      res.send(`/${req.file.path}`)
    } else {
      res.status(400).send('No file uploaded!')
    }
  }
)

export { router as uploadCategoryRouter }
