import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { email, password } = req.body

  const user = await UserModel.findOne({ email })

  res.json(user)
})
router.post('/login')

export { router as userRouter }
