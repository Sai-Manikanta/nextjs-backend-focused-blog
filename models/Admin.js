import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const AdminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);