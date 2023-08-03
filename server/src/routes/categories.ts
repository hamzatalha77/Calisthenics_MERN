import path from 'path'
import express from 'express'
import multer from 'multer'
import { Request, Response } from 'express'
import {
  createCategory,
  getCategories
} from '../controllers/categoryController'

const router = express.Router()

router.route('/').get(getCategories).post(createCategory)

export { router as categoryRouter }
