import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js'; // Correct import statement

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  let refreshToken = req.cookies.refreshToken;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        req.user = await User.findById(decoded.id).select('-password');
        next();
      } else {
        res.status(401);
        throw new Error('Not authorized, invalid token');
      }
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, invalid token');
    }
  } else if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      if (decoded) {
        const { accessToken } = generateToken(res, decoded.id, decoded.isAdmin);
        req.user = await User.findById(decoded.id).select('-password');
        req.accessToken = accessToken; // Optional: Store accessToken in request for future use
        next();
      } else {
        res.status(401);
        throw new Error('Not authorized, invalid refresh token');
      }
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, invalid refresh token');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
