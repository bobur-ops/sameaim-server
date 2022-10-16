import express from 'express';
import {
	createClub,
	deleteClub,
	getClub,
	getClubBySearch,
	getClubs,
	updateClub,
} from '../controllers/club.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getClubBySearch);
router.get('/', getClubs);
router.get('/:id', getClub);
router.post('/', createClub);
router.patch('/:id', auth, updateClub);
router.delete('/:id', auth, deleteClub);

export default router