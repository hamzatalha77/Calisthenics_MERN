import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users'
import { LoginUser, registeredUser } from '../controllers/userController'

const router = express.Router()

router.route('/register').post(registeredUser)

router.route('/login').post(LoginUser)

export { router as userRouter }
