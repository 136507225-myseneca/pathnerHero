import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    spotifyId: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    photo: {
      type: String,
    },
    expires_in: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User
