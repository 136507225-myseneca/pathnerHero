import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Libary from '../models/libaryModal.js'
import SpotifyWebApi from 'spotify-web-api-node'

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    add to user libary
// @route   POST /api/libary
// @access  Public
const addLibray = asyncHandler(async (req, res) => {
  const { _id, albumImage, trackName, albumName, trackId, artistName } =
    req.body

  const userExists = await User.findById(_id)

  if (userExists) {
    const libary = await Libary.create({
      spotifyId: userExists.spotifyId,
      albumImage,
      trackName,
      albumName,
      trackId,
      artistName,
    })

    if (libary) {
      res.status(201).json({
        _id: libary._id,
        spotifyId: libary.userId,
        albumImage: libary.albumImage,
        trackName: libary.trackName,
        albumName: libary.albumName,
        trackId: libary.trackId,
        artistName: libary.artistName,
      })
    } else {
      res.status(400)
      throw new Error('Invalid track data')
    }
  } else {
    res.status(400)
    throw new Error('User not found')
  }
})

// @desc    Delete a Tack in Libary
// @route   DELETE /api/libary/:id
// @access  Private/Admin
const deleteTrack = asyncHandler(async (req, res) => {
  const libary = await Libary.findOne({
    trackId: req.params.id,
    spotifyId: req.user.spotifyId,
  })

  if (libary) {
    await libary.remove()
    res.json({ message: 'track removed from removed' })
  } else {
    res.status(404)
    throw new Error('track not found')
  }
})

// @desc    Get a users libary
// @route   GET /api/libary
// @access  Public
const getUserLibary = asyncHandler(async (req, res) => {
  const { spotifyId } = req.params
  const libary = await Libary.find({ spotifyId: spotifyId })

  res.json(libary)
})

// @desc    login a  user
// @route   POST /api/users
// @access  Public
const login = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      user: req.user,
    })
  } else {
    res.status(401).json({
      success: false,
    })
  }
})

// @desc    logout a  user
// @route   POST /api/users
// @access  Public
const logout = asyncHandler(async (req, res) => {
  req.logout()
  req.session.destroy()

  res.clearCookie('token')
  console.log('logout user data!')
  res.status(200).json({
    success: true,
  })
})

// @desc    login failed
// @route   POST /api/users
// @access  Public

const loginFailed = asyncHandler(async (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  })
})

// @desc    refresh access token
// @route   POST /api/refresh
// @access  Public

const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.body.refreshToken2

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.website_url,
    clientId: process.env.clientID,
    clientSecret: process.env.clientSecret,
    refreshToken,
  })
  let user = await User.findById(req.body._id)
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      if (user) {
        user.accessToken = data.body.access_token
        user.expires_in = data.body.expires_in
        user.save((err, doc) => {
          if (err) {
            console.log(`error occured while saving: ${err}`)
          } else {
          }
        })
      }
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(400)
    })
})

export {
  registerUser,
  login,
  logout,
  loginFailed,
  refresh,
  addLibray,
  deleteTrack,
  getUserLibary,
}
