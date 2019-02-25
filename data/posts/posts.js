const Post = require('../../models/Post')

exports.AddPost = post => new Post(post).save()

exports.GetAllPosts = () => Post.find().sort('_created')

exports.GetPostsByUserId = userId => Post.findOne({user: userId})

exports.GetPostsById = postId => Post.findOne({_id: postId})

exports.UpdatePostText = (postId, text, edited) => Post.findOneAndUpdate({_id: postId}, {$set: {text: text}, $push: {_edited: edited}})

exports.AddPostComment = (postId, comment) => Post.findOneAndUpdate({_id: postId}, {$push: {comments: comment}})

exports.PushToArrayByKey = (key, postId, value) => {
  let query = {$push: {}}
  query.$push[key] = value

  return Post.updateOne({_id: postId}, query)
}

exports.PullFromArrayByKey = (key, postId, value) => {
  const query = {$pull: {}}
  query.$pull[key] = value
  
  return Post.updateOne({_id: postId}, query)
}

exports.DeletePost = (postId, userId) => Post.deleteOne({_id: postId, user: userId})