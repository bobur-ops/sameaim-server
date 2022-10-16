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

export const getClub = async (req, res) => {
	const { id } = req.params;

	try {
		const club = await Club.findById(id);

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
		const user = JSON.parse(club.author)
		const newUser = {
			...user,
			joinedClubs: [...user.joinedClubs, newClub]
		}
		await User.findByIdAndUpdate(user._id, newUser)

		res.status(201).json({newClub, newUser});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const updateClub = async (req, res) => {
	const { id } = req.params;
	const { author, clubName, description, members, clubId } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No club with id: ${id}`);

	const updatedClub = {
		author,
		clubName,
		description,
		members,
		clubId,
		_id: id,
	};

	await Club.findByIdAndUpdate(id, updatedClub, { new: true });
	res.json(updatedClub);
};

export const deleteClub = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No club with id: ${id}`);

	await Club.findByIdAndRemove(id);

	res.json({ message: 'Post deleted successfully' });
};
