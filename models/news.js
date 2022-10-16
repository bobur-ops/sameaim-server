import mongoose from 'mongoose';

const newsSchema = mongoose.Schema({
	image: String,
	title: String,
	content: String,
	comments: [{ author: String, text: String }],
});

export default mongoose.model('News', newsSchema);
