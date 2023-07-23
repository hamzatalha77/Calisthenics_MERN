import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { first_name, last_name, user_image, email, password } = req.body

  const user = await UserModel.findOne({ email })

  if (user) {
    return res.json({ message: 'User already exists!' })
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = new UserModel({
    first_name,
    last_name,
    user_image,
    email,
    password: hashedPassword
  })
  await newUser.save()

  res.json({ message: 'User Registered Successfully !' })
})
router.post('/login')

export { router as userRouter }
