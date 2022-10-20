import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
	author: String,
	text: String,
	likes: [String]
})

export default mongoose.model('Comments', commentSchema);