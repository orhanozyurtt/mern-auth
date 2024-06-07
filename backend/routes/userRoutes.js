// userRoutes.js

import express from 'express';
import {
  authUser,
  logoutUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAdminPage,
  refreshAccessToken,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/admin').get(protect, admin, getAdminPage);
router.get('/refresh-token', refreshAccessToken);
export default router;
