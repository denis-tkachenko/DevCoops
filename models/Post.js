const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = {
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  dislikes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
      },
      _created: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  _created: {
    type: Date,
    default: Date.now()
  },
  _edited: [
    {
      date: {
        type: Date,
        required: true
      },
      editedText: {
        type: String,
        requirted: true
      }
    }
  ],
  _deleted: {
    type: Boolean,
    default: false
  }
}

module.exports = Post = mongoose.model('post', PostSchema)