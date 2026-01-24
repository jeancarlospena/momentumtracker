import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'


import asyncHandler from "../middleware/asyncHandler.js"


const requireAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET)
      req.user = await (User.findById(decoded.userId)).select('-password -paypalPayments')


    } catch (error) {
      res.cookie('jwt', '', { httpOnly: true, expiresIn: new Date(0) })
      res.status(200).json('User not logged in')
    }
  } else {
    throw new Error('Not authorized')
  }
  next()
})

const requireAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    throw new Error('Not authorized')
  }
})

export { requireAdmin, requireAuth }



