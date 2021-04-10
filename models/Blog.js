import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const BlogSchema = new mongoose.Schema({
  title: {
      type: String,
      required: true
  },
  body: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
   },
})

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);