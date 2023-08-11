import path from 'path'
import multer from 'multer'
import { Request } from 'express'

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

const multipleUpload = multer({
  storage,
  fileFilter: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: any, acceptFile: boolean) => void
  ) {
    checkFileType(file, cb)
  }
}).array('images', 5)

const singleUpload = multer({
  storage,
  fileFilter: function (req: Request, file: any, cb: any) {
    checkFileType(file, cb)
  }
}).single('image_category')

export { multipleUpload, singleUpload }
