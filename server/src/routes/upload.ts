import path from 'path'
import express from 'express'
import multer from 'multer'
import { Request, Response } from 'express'
import { ExerciseModel } from '../models/Exercises'

const router = express.Router()

const storage = multer.diskStorage({
  destination(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, 'uploads/')
  },
  filename(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  }
})

function checkFileType(
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void
) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(new Error('Images only!'), false)
  }
}

const upload = multer({
  storage,
  fileFilter: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: any, acceptFile: boolean) => void
  ) {
    checkFileType(file, cb)
  }
}).array('images[]', 5)

router.post('/', upload, async (req: Request, res: Response) => {
  const fileArray = req.files as Express.Multer.File[]
  if (fileArray) {
    const fileUrls = fileArray.map(
      (file: Express.Multer.File) =>
        `${req.protocol}://${req.get('host')}/${file.path
          .replace(/\\/g, '/')
          .replace('[]', '')}`
    )
    const data = {
      ...req.body,
      images: fileUrls
    } as any
    const exercises = new ExerciseModel(data)
    await exercises.save()
    res.json(exercises)
  } else {
    res.status(400).json({ error: 'No files were uploaded.' })
  }
})

export default router

export { router as uploadRouter }
