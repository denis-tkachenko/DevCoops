const to = require('../../utilities/utilities').to
const profileLogic = require('../../logic/profile/profile')
const validateProfileInput = require('../../validation/profile')

exports.GetProfile = async (req, res) => {
  const errors = {}
  const [err, profile] = await to(profileLogic.GetUserProfileById(req.user.id))
  if(err) return res.status(404).json(err)

  if(!profile) {
    errors.noprofile = 'There is no profile for this user'
    return res.status(404).json(errors)
  }

  res.json(200).json(profile)
}

exports.PostUserProfile = async (req, res) => {
  const {errors, isValid} = validateProfileInput(req.body)
  if(!isValid) return res.status(400).json(errors)

  const userId = req.user.id
  const profileFields = req.body

  profileFields.social = {}
  
  if(profileFields.youtube) profileFields.social.youtube = profileFields.youtube
  if(profileFields.twitter) profileFields.social.twitter = profileFields.twitter
  if(profileFields.facebook) profileFields.social.facebook = profileFields.facebook
  if(profileFields.linkdin) profileFields.social.linkdin = profileFields.linkdin
  if(profileFields.instragram) profileFields.social.instragram = profileFields.instragram
  if(profileFields.skills !== 'undefined') profileFields.skills = profileFields.skills.split(',')

  const [err, profile] = await to(profileLogic.AddEditUserProfile(userId, profileFields))
  if(err) return res.status(404).json(err)

  if(profile && profile.err) {
    errors.handle = profile.err
    return res.status(400).json(errors)
  }

  if(profile) return res.status(200).json(profile)
  
  res.status(400).json()
}