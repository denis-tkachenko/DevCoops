const router = require('express').Router()

router.get('/test', (req, res) => res.json({msg: 'Posts Works'}))

module.exports = router