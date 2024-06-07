// userController.js
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// token yaratan yardımcı app

import { generateToken, refreshToken } from '../utils/generateToken.js';

// import axios from 'axios';

// @desc Auth user/set token
// route POST /api/users/auth
// @acces Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  1;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id, user.isAdmin);
    refreshToken(res, user._id, user.isAdmin);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Register a new user
// route POST /api/users
// @acces Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin: false,
  });

  if (user) {
    generateToken(res, user._id, user.isAdmin);
    refreshToken(res, user._id, user.isAdmin);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Logout user
// route POST /api/users/logout
// @acces Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.cookie('refreshToken', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'user logged out  ' });
});
// @desc get user profile
// route GET /api/users/profile
// @acces Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json({ message: 'User Profile', info: user });
});

// @desc update user profile
// route PUT /api/users/profile
// @acces Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
  // res.status(200).json({ message: 'update User Profile' });
});

//
// @desc update user profile
// route get /api/users/admin
// @acces Private
const getAdminPage = asyncHandler((req, res) => {
  res.status(200).json({ message: 'admin page sayfası' });
});

// @desc Erişim token'ını yenile
// route POST /api/users/refresh-token
// @access Public
const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(401);
    throw new Error('not authorized ');
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401);
      throw new Error('user not exist ');
    }

    const { accessToken } = generateToken(res, user._id, user.isAdmin);
    if (accessToken) {
      res.status(200).json('Access token renewal successful');
    }
  } catch (error) {
    res.status(403);
    throw new Error('Invalid refresh token');
  }
});

export {
  authUser,
  logoutUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAdminPage,
  refreshAccessToken,
};
