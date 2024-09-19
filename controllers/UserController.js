const User = require('../models/UserModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");
const JWT_SECRET = process.env.JWT_SECRET;

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single user
const getUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such User" });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "No Such User" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const { user_name, user_password, user_role, songs } = req.body;

    try {
        const existingUser = await User.findOne({ user_name });

        if (existingUser) {
            return res.status(201).json({ error: "User name already exists" });
        }
        const hashedPassword = CryptoJS.SHA256(user_password).toString(CryptoJS.enc.Hex);

        const user = await User.create({ 
            user_name, 
            user_password: hashedPassword, 
            user_role,
            songs
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such User" });
    }

    try {
        const user = await User.findOneAndDelete({ _id: id });
        if (!user) {
            return res.status(404).json({ error: "No Such User" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such User" });
    }

    try {
        const user = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
        if (!user) {
            return res.status(404).json({ error: "No Such User" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//update user song
const updateSongInUser = async (req, res) => {
    const { id } = req.params;
    const { song_id, song_name, song_image, song_url } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "No Such User" });
        }

        const existingSongIndex = user.songs.findIndex(song => song.song_id === song_id);
        if (existingSongIndex !== -1) {
            return res.status(400).json({ error: "Song already exists in user's songs" });
        }
        const newSong = {
            song_id: song_id,
            song_name: song_name,
            song_image: song_image,
            song_url: song_url
        };

        user.songs.push(newSong);
        
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//delete song in user
const deleteSongInUser = async (req, res) => {
    const { id } = req.params;
    const { song_id } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "No Such User" });
        }

        const songIndex = user.songs.findIndex(song => song.song_id === song_id);

        if (songIndex === -1) {
            return res.status(404).json({ error: "Song not found in user's songs" });
        }

        user.songs.splice(songIndex, 1);

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// User login
const loginUser = async (req, res) => {
    const { user_name, user_password } = req.body;

    try {
        const user = await User.findOne({ user_name });
        if (!user) {
            return res.status(200).json({ error: "User does not exist" });
        }

        const hashedPassword = CryptoJS.SHA256(user_password).toString(CryptoJS.enc.Hex);

        if (hashedPassword === user.user_password) {
            const token = jwt.sign({ userId: user._id, user_role: user.user_role }, JWT_SECRET, { expiresIn: '7d' });
            return res.json({
                user_name: user.user_name,
                user_id: user._id,
                user_role: user.user_role,
                songs: user.songs,
                token: token
            });
        } else {
            return res.status(200).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    loginUser,
    updateSongInUser,
    deleteSongInUser
};
