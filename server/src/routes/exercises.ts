import express from 'express'
import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import {
  allExercise,
  createExercise,
  upload
} from '../controllers/exerciseController'

const router = express.Router()

router.route('/').get(allExercise)
router.route('/').post((req: Request, res: Response, next: NextFunction) => {
  upload(req, res, function (err: any) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'File upload error' })
    } else if (err) {
      return res.status(500).json({ error: 'Internal server error' })
    }
    next()
  })
}, createExercise)

export { router as exerciseRouter }
