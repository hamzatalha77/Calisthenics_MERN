import multer from 'multer'
import path from 'path'
import express from 'express'

const router = express.Router()

const storage = multer.diskStorage({
  destination(req: Request, file: any, cb: any) {
    cb(null, 'uploads/')
  },
  filename(req: Request, file: any, cb: any) {
    cb(null, `${file.filename}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

const checkFileType = (file: any, cb: any) => {
  const fileTypes = /jpg|jpeg|png/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileTypes.test(file.mimetype)
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Invalid file type. Only JPG, JPEG, and PNG images are allowed.')
  }
}

const upload = multer({
  storage
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
export default router
