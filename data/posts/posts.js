const Post = require('../../models/Post')

exports.AddPost = post => new Post(post).save()

exports.GetPostsByUserId = userId => Post.findOne({user: userId})

exports.GetPostsById = postId => Post.findOne({_id: postId})

exports.UpdatePost = (postId, text, edited) => Post.findOneAndUpdate({_id: postId}, {$set: {text: text}, $push: {_edited: edited}})