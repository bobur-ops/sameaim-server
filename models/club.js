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
				description: String,
				comments: {
					type: [
						{
							id: String,
							author: String,
							text: String,
							likes: {type: [String], default: []},
							commentId: String
						}
					],
					default: []
				},
				createdAt: {
					type: Date,
					default: new Date(),
				},
			}
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
