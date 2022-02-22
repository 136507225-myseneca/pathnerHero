import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import passport from 'passport'
import cors from 'cors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import Passport from './config/passport.js'
import session from 'express-session'

import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.set('trust proxy', 1) // trust first proxy

app.use(
  session({
    secret: 'secretcode',
    resave: false,
    saveUninitialized: true,
    proxy: true,
    name: 'token',
    cookie: {
      // sameSite: 'none',
      // secure: true,
      // httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
    },
  })
)

app.use(cors({ credentials: true, origin: process.env.website_url }))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use('/api/users', userRoutes)
Passport(passport)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
