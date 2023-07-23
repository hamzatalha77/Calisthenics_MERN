import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users'
import generateToken from '../utils/generateToken'

const LoginUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })

    if (!user) {
      res.status(400).json({ message: "User Doesn't Exist!" })
      return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      res.status(400).json({ message: 'Email or Password is Incorrect!' })
      return
    }

    const token = generateToken(user._id)
    res.status(201).json({ token, userID: user._id })
  }
)

const registeredUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { first_name, last_name, user_image, email, password } = req.body

    const user = await UserModel.findOne({ email })

    if (user) {
      res.status(400).json({ message: 'User already exists!' })
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

    res.status(201).json({ message: 'User Registered Successfully!' })
  }
)

export { registeredUser, LoginUser }
