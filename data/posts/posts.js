const Post = require('../../models/Post')

exports.AddPost = post => new Post(post).save()

exports.GetPostsByUserId = userId => Post.find({user: userId})