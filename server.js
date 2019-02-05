const express = require('express')
const mongoose = require('mongoose')

const app = express()
const db = require('./config/keys').mongoURI // DB config

mongoose // Connect to MongoDb
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello!'))

const port = process.env.Port || 5000

app.listen(port, () => console.log(`Server running on port: ${port}`))