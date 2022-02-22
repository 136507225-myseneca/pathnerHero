import express from 'express'
const router = express.Router()
import passport from 'passport'
import {
  registerUser,
  login,
  logout,
  loginFailed,
  refresh,
  addLibray,
  deleteTrack,
  getUserLibary,
} from '../controllers/userController.js'
import { user } from '../middleware/authMiddleware.js'
router.route('/').post(registerUser)

router.get('/auth/spotify', passport.authenticate('spotify'))
router.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', {
    failureMessage: 'Cannot login with spotify, please try again later!',
    successRedirect: process.env.website_url,
    failureRedirect: '/login/failed',
  }),
  (req, res) => {
    res.redirect(process.env.website_url)
  }
)

router.route('/auth/login').get(login)
router.route('/auth/refresh').post(refresh)
router.route('/auth/libary/:spotifyId').get(getUserLibary)
router.route('/auth/libary/:id').delete(user, deleteTrack)
router.route('/auth/libary').post(user, addLibray)

router.route('/login/failed').get(loginFailed)

router.route('/auth/logout').get(logout)

export default router
