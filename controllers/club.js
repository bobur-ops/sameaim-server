import mongoose from 'mongoose';
import Club from '../models/club.js';
import User from '../models/user.js';

export const getClubs = async (req, res) => {
	try {
		const clubs = await Club.find();

		res.status(200).json({ data: clubs });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getClubsRating = async (req, res) => {
	try {
		const clubs = await Club.find();

		const rating = clubs
			.sort((a, b) => {
				return parseFloat(a.members.length) - parseFloat(b.members.length);
			})
			.slice(0, 4);

		res.status(200).json({ data: rating });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getClub = async (req, res) => {
	const { id } = req.params;

	try {
		const clubs = await Club.find();
		const club = clubs.find((item) => item.clubId === id);

		res.status(200).json(club);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getClubBySearch = async (req, res) => {
	const { searchQuery } = req.body;

	try {
		const title = new RegExp(searchQuery, 'i');

		const clubs = await Club.find({
			$or: [{ title }],
		});
		res.json({ data: clubs });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createClub = async (req, res) => {
	const club = req.body;

	const newClub = new Club({
		...club,
		members: [club.author],
		createdAt: new Date().toISOString(),
	});

	try {
		await newClub.save();
		const user = JSON.parse(club.author);
		const newUser = {
			...user,
			joinedClubs: [...user.joinedClubs, newClub],
		};
		await User.findByIdAndUpdate(user._id, newUser);

		res.status(201).json({ newClub, newUser });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const updateClub = async (req, res) => {
	const { id } = req.params;
	const { author, clubName, description, members, clubId, posts, createdAt } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No club with id: ${id}`);

	const updatedClub = {
		author,
		clubName,
		description,
		members,
		clubId,
		posts,
		createdAt,
		_id: id,
	};

	await Club.findByIdAndUpdate(id, updatedClub, { new: true });
	res.json(updatedClub);
};

export const createPost = async (req, res) => {
	const { id } = req.params
	const post = req.body


	const club = await Club.findById(id)

	const newPost = {...post, author: club.author, createdAt: new Date().toISOString(),}

	try {
		await Club.findByIdAndUpdate(id, {"$set": { posts: [newPost, ...club.posts] }})
		res.json(newPost)
	} catch(error) {
		res.status(404).json({ message: error.message });
	}
}

export const deleteClub = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No club with id: ${id}`);

	await Club.findByIdAndRemove(id);

	res.json({ message: 'Post deleted successfully' });
};

export const getPost = async (req, res) => {
	const { id, postId } = req.params

	try {
		const clubs = await Club.find();
		const club = clubs.find((item) => item.clubId === id);

		const post = club.posts.find(item => item.postId === postId)

		res.status(200).json(post)
	} catch(error) {
		res.status(404).json({message: error.message})
	}
}

export const setMember = async (req, res) => {
	const { user } = req.body
	const { clubId, userId } = req.params

	try {
		const club = await Club.findById(clubId)
		const gotUser = JSON.parse(user)

		await User.findByIdAndUpdate(userId, { "$set": { joinedClubs: [club, ...gotUser.joinedClubs] } })
		await Club.findByIdAndUpdate(clubId, {"$set": { members: [user,...club.members] }})
		res.json({message: 'success'})
	} catch(error) {
		res.status(404).json({message: error.message})
	}
}

export const leaveMember = async (req, res) => {
	const { user } = req.body
	const { clubId } = req.params

	try {
		const gotUser = JSON.parse(user)
		const club = await Club.findById(clubId)

		const newUserClub = gotUser.joinedClubs.filter((item) => item.clubId !== club.clubId)
		const newClubMembers = club.members.filter((item) => JSON.parse(item).userId !== gotUser.userId)
		
		await User.findByIdAndUpdate(gotUser._id, { "$set": { joinedClubs: newUserClub } })
		await Club.findByIdAndUpdate(clubId, {"$set": { members: newClubMembers }})
		res.json({message: 'success'})
	} catch(error) {
		res.status(404).json({message: error.message})
	}
}