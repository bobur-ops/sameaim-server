import express from 'express';
import {
	createClub,
	deleteClub,
	getClub,
	getClubBySearch,
	getClubs,
	getClubsRating,
	updateClub,
	createPost,
	getPost,
	setMember,
	leaveMember
} from '../controllers/club.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getClubBySearch);
router.get('/', getClubs);
router.get('/rating', getClubsRating);
router.get('/:id', getClub);
router.post('/createClub', createClub);
router.patch('/updateClub/:id', updateClub);
router.post('/createPost/:id', createPost)
router.delete('/deleteClub/:id', deleteClub);
router.get('/getPost/:id/:postId', getPost)
router.post('/setMember/:clubId/:userId', setMember)
router.post('/leave/:clubId', leaveMember)


export default router;
