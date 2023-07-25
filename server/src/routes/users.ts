import express from 'express'
import { LoginUser, registeredUser } from '../controllers/userController'

const router = express.Router()

router.route('/register').post(registeredUser)

router.route('/login').post(LoginUser)

export { router as userRouter }
