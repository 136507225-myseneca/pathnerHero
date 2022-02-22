import User from '../models/userModel.js'
// // const Strategy = require('passport-spotify').Strategy
import { Strategy } from 'passport-spotify'

const Passport = (passport) => {
  // Spotify Strategy
  passport.use(
    new Strategy(
      {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: '/api/users/auth/spotify/callback',
      },
      async (accessToken, refreshToken, expires_in, profile, cb) => {
        const userExists = await User.findOne({ id: profile.id })

        if (userExists) {
          userExists.accessToken = accessToken
          userExists.refreshToken = refreshToken
          userExists.expires_in = expires_in
          userExists.save((err) => {
            if (err) {
              console.log(`error occured while saving: ${err}`)
            } else {
              return cb(null, userExists)
            }
          })
        } else {
          const user = await User.create({
            displayName: profile.displayName,
            spotifyId: profile.id,
            photo: profile.photos[0]?.value,
            accessToken: accessToken,
            refreshToken: refreshToken,
            expires_in: expires_in,
          })
          return cb(null, user)
        }
      }
    )
  )

  passport.serializeUser((user, cb) => {
    cb(null, user)
  })

  passport.deserializeUser((user, cb) => {
    cb(null, user)
  })
}

export default Passport
