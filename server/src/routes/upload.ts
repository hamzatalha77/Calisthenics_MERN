import multer from 'multer'
import path from 'path'
import express, { Request } from 'express'

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
    cb(null, `${file.filename}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

const checkFileType = (
  file: Express.Multer.File,
  cb: (error: string | null, acceptFile: boolean) => void
) => {
  const fileTypes = /jpg|jpeg|png/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileTypes.test(file.mimetype)
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Invalid file type. Only JPG, JPEG, and PNG images are allowed.', false)
  }
}

const upload = multer({
  storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    checkFileType(file, cb)
  }
})

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({
      error: 'No image file received.'
    })
  }

  res.send({
    message: 'Image Uploaded',
    image: `/${req.file.path}`
  })
})

export { router as uploadRouter }
