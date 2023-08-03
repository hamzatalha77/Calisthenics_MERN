import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: [true, 'Category Required'],
      unique: [true, 'Category must be unique'],
      minlength: [3, 'Too short category name'],
      maxlength: [32, 'Too long category name']
    },
    slug: {
      type: String,
      lowercase: true
    },
    image_category: {
      type: String
    }
  },
  { timestamps: true }
)

export const CategoryModel = mongoose.model('categories', categorySchema)
