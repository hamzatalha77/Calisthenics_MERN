import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  user_image: { type: String },
  password: { type: String, required: true }
})
export const UserModel = mongoose.model('users', UserSchema)
