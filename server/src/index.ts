import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/database'
import { userRouter } from './routes/users'
import { exerciseRouter } from './routes/exercises'
import { uploadRouter } from './routes/upload'
import path from 'path'
import { imagesRouter } from './routes/images'

dotenv.config()

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', userRouter)
app.use('/api/exercises', exerciseRouter)
app.use('/api/upload', uploadRouter)
app.use('/uploads', imagesRouter)

// const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.get('/', (req, res) => {
  res.send('Welcome to the server!')
})

connectDB()

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
