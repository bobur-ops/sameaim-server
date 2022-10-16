import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	fullName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	registeredAt: { type: Date, default: new Date() },
	userId: String,
	joinedClubs: {
		type: [
			{
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
				},
			},
		],
		default: [],
	},
});

export default mongoose.model('User', userSchema);
