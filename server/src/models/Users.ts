import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    user_image: { type: String }
  },
  { timestamps: true }
)
export const UserModel = mongoose.model('users', UserSchema)
