import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'

import connectDB from '../config/database'

dotenv.config()
const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server')
})

connectDB()

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
