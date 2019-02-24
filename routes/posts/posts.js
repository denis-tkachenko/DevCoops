const postsLogic = require('../../logic/posts/posts')
const utilities = require('../../utilities/utilities')
const to = utilities.to
const formatLogicError = utilities.formatLogicError

exports.PostAddPost = async (req, res) => {
  const {text} = req.body, userId = req.user._id
  if(!text) return res.status(400).json({posts: 'Post text is missing'})
  
  const [err, post] = await to(postsLogic.AddPost(userId, text))
  if(err) return res.status(500).json(formatLogicError('post', `Can't add this post`))
  
  res.status(200).json(post)
}

exports.GetPostsByUserId = async (req, res) => {
  const [err, posts] = await to(postsLogic.GetPostsByUserId(req.user._id))
  if(err) return res.status(500).json(formatLogicError('posts', `Can't add post`))

  res.status(200).json(posts)
}
