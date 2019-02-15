const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const login = require('./routes/login/index')
const users = require('./routes/users/index')
const profile = require('./routes/profile/index')
const posts = require('./routes/posts/index')

const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// DB Config
const db = require('./config/keys').mongoURI // DB config

mongoose // Connect to MongoDb
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

// Use routes
app.use('/login', login)
app.use('/users', users)
app.use('/profile', profile)
app.use('/posts', posts)

const port = process.env.Port || 5000

app.listen(port, () => console.log(`Server running on port: ${port}`))