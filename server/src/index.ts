import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/database'
import { userRouter } from './routes/users'
import { exerciseRouter } from './routes/exercises'

dotenv.config()

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', userRouter)
app.use('/exercise', exerciseRouter)
app.use('/uploads', express.static('uploads'))
app.get('/', (req, res) => {
  res.send('Welcome to the server!')
})

connectDB()

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
