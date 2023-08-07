import mongoose from 'mongoose'

const subCategorySchema = new mongoose.Schema(
  {
    subcategory_name: {
      type: String,
      // trim: true,
      unique: [true, 'SubCategory must be unique'],
      minlength: [2, 'To short te be name'],
      maxlength: [32, 'To long to be name']
    },
    slug: {
      type: String,
      lowercase: true
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'categories',
      required: [true, 'Subcategory must be  belong to parent category']
    }
  },
  { timestamps: true }
)

export const SubCategoryModel = mongoose.model(
  'subcategories',
  subCategorySchema
)
