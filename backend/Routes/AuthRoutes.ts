import express from 'express';
import { registerUser,getUser,getAllUsers,loginUser,logOut } from '../Controllers/AuthController';

import { AuthMiddleware,authorize } from '../Middleware/AuthMiddleware';
const router = express.Router();

// Register a new user
router.post('/signup', registerUser);

// Login user
router.post('/login', loginUser);

// Protected route to get user details
router.get('/user', AuthMiddleware, getUser);
//get all users
router.get('/users',AuthMiddleware,getAllUsers)
//logout single session
router.post('/logout', AuthMiddleware, logOut)

// Admin/Moderator Only Route - Protect route for admin/moderator
router.get('/admin', AuthMiddleware, authorize('admin', 'user'), (req, res) => {
    res.json({ msg: 'Welcome Admin or Moderator' });
});

export default router;


