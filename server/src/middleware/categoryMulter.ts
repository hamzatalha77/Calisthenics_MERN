import { Request } from 'express'
import path from 'path'
import multer from 'multer'

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

export { uploadcategory }
