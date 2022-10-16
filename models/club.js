import mongoose from 'mongoose';

const clubSchema = mongoose.Schema({
	author: String,
	clubName: String,
	description: String,
	posts: {
		type: [
			{
				author: String,
				title: String,
				content: String,
				postId: String,
				comments: [
					{
						author: String,
						text: String,
					},
				],
			},
		],
		default: [],
	},
	members: [String],
	clubId: String,
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

export default mongoose.model('Club', clubSchema);
