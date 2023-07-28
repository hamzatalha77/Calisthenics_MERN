import path from 'path'
import express from 'express'
import fs from 'fs'

const router = express.Router()
router.get('/:filename', (req, res) => {
  const filename = req.params.filename
  const imagePath = path.join(__dirname, '..', '..', 'uploads', filename)

  // Check if the file exists
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath)
  } else {
    res.status(404).send('Image not found')
  }
})

export { router as imagesRouter }
