import express from 'express';
const router = express.Router();
import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddlerware.js';
import { userValidation, validate } from '../validators/userValidator.js';

router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;