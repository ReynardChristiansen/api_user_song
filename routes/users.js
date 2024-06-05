const express = require('express');
const { createUser, getUsers, getUser, deleteUser, updateUser, loginUser, updateSongInUser, deleteSongInUser } = require('../controllers/UserController');
const authenticateToken = require('../middleware/AuthMiddleware');
const router = express.Router();

// Public routes
router.post('/login', loginUser);
router.post('/register', createUser);

// Protected routes
router.get('/', authenticateToken, getUsers);
router.patch('/update/:id', authenticateToken, updateSongInUser);
router.delete('/delete/:id', authenticateToken, deleteSongInUser);
router.get('/:id', authenticateToken,getUser);
router.delete('/:id',authenticateToken, deleteUser);
router.patch('/:id', authenticateToken, updateUser);

module.exports = router;