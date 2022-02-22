import mongoose from 'mongoose'

const libarySchema = mongoose.Schema(
  {
    spotifyId: {
      type: String,
      required: true,
    },
    albumImage: {
      type: String,
      required: true,
    },
    trackName: {
      type: String,
      required: true,
    },
    albumName: {
      type: String,
      required: true,
    },
    trackId: {
      type: String,
      required: true,
    },
    artistName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Libary = mongoose.model('Libary', libarySchema)

export default Libary
