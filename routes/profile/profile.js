const profileLogic = require('../../logic/profile/profile')
const validateProfileInput = require('../../validation/profile').validateProfileInput
const utilities = require('../../utilities/utilities')
const to = utilities.to
const formatError = utilities.formatError

exports.GetUserProfile = async (req, res) => {
  const errors = {}
  const [err, profile] = await to(profileLogic.GetUserProfileByUserId(req.user.id))
  if(err) return res.status(404).json(formatError('noprofile', 'There is no profile for this user', err))

  if(!profile) {
    errors.noprofile = 'There is no profile for this user'
    return res.status(404).json(errors)
  }

  res.status(200).json(profile)
}

exports.PostUserProfile = async (req, res) => {
  const {errors, isValid} = validateProfileInput(req.body)
  if(!isValid) return res.status(400).json(errors)

  const userId = req.user.id
  const profileFields = req.body

  setProfileInfo(profileFields, userId)

  const [err, profile] = await to(profileLogic.AddEditUserProfile(userId, profileFields))
  if(err) return res.status(404).json(formatError('profile', null, err))

  if(profile && profile.err) {
    errors.handle = profile.err
    return res.status(400).json(errors)
  }

  if(profile) return res.status(200).json(profile)
  
  res.status(400).json()
}

function setProfileInfo(profileFields, userId) {
  profileFields.social = {}
  profileFields.user = userId

  if(profileFields.youtube) profileFields.social.youtube = profileFields.youtube
  if(profileFields.twitter) profileFields.social.twitter = profileFields.twitter
  if(profileFields.facebook) profileFields.social.facebook = profileFields.facebook
  if(profileFields.linkdin) profileFields.social.linkdin = profileFields.linkdin
  if(profileFields.instragram) profileFields.social.instragram = profileFields.instragram
  if(profileFields.skills !== 'undefined') profileFields.skills = profileFields.skills.split(',')
}

exports.GetProfileByHandle = async (req, res) => {
  const {handle} = req.params, errors = {}
  if(!handle) return res.status(400)

  const [err, profile] = await to(profileLogic.GetProfileByHandle(handle))
  if(err) return res.status(404).json(formatError('profile', 'There is no profile for this handle', err))

  if(!profile) {
    errors.noprofile = 'There is no profile for this user'
    return res.status(400).json(errors)
  }
  
  res.status(200).json(profile)
}

exports.GetProfileById = async (req, res) => {
  const {profileId} = req.params, errors = {}
  if(!profileId) return res.status(400)

  const [err, profile] = await to(profileLogic.GetProfileById(profileId))
  if(err) return res.status(404).json(formatError(formatError('profile', 'There is no profile for this id', err)))

  if(!profile) {
    errors.noprofile = 'There is no profile for this id'
    return res.status(400).json(errors)
  }

  res.status(200).json(profile)
}

exports.GetAllProfiles = async (req, res) => {
  const [err, profiles] = await to(profileLogic.GetAllProfiles())
  if(err) return res.status(404).json(formatError('profile', null, err))

  res.status(200).json(profiles)
}