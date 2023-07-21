import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import chalk from 'chalk' // Import the 'chalk' package here
import mongoose from 'mongoose'
import connectDB from '../config/database'

dotenv.config()
connectDB()
const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(
    `[server]: Server is running at ${chalk.yellow.bold(
      `http://localhost:${port}`
    )}`
  )
})
