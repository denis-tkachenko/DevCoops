const profileLogic = require('../../logic/profile/profile')
const validations = require('../../validation/profile')
const utilities = require('../../utilities/utilities')
const moment = require('moment')
const to = utilities.to
const formatLogicError = utilities.formatLogicError

exports.GetUserProfile = async (req, res) => {
  const errors = {}
  const [err, profile] = await to(profileLogic.GetUserProfileByUserId(req.user.id))
  if(err) return res.status(404).json(formatLogicError('noprofile', 'There is no profile for this user', err))

  if(!profile) {
    errors.noprofile = 'There is no profile for this user'
    return res.status(404).json(errors)
  }

  res.status(200).json(profile)
}

exports.PostUserProfile = async (req, res) => {
  const [errors, isValid] = validations.validateProfileInput(req.body)
  if(!isValid) return res.status(400).json(errors)

  const [err, profile] = await to(profileLogic.AddEditUserProfile(req.user.id, req.body))
  if(err) return res.status(404).json(formatLogicError('profile', 'Somthing went wrong!', err))

  if(profile && profile.err) {
    errors.handle = profile.err
    return res.status(400).json(errors)
  }

  if(profile) return res.status(200).json(profile)
  
  res.status(400)
}

exports.GetProfileByHandle = async (req, res) => {
  const {handle} = req.params, errors = {}
  if(!handle) return res.sendStatus(400)

  const [err, profile] = await to(profileLogic.GetProfileByHandle(handle))
  if(err) return res.status(404).json(formatLogicError('profile', 'There is no profile for this handle', err))

  if(!profile) {
    errors.noprofile = 'There is no profile for this user'
    return res.status(400).json(errors)
  }
  
  res.status(200).json(profile)
}

exports.GetProfileById = async (req, res) => {
  const {profileId} = req.params, errors = {}
  if(!profileId) return res.sendStatus(400)

  const [err, profile] = await to(profileLogic.GetProfileById(profileId))
  if(err) return res.status(404).json(formatLogicError('profile', 'There is no profile', err))

  if(!profile) {
    errors.noprofile = 'There is no profile'
    return res.status(400).json(errors)
  }

  res.status(200).json(profile)
}

exports.GetAllProfiles = async (req, res) => {
  const [err, profiles] = await to(profileLogic.GetAllProfiles()), errors = {}
  if(err) return res.status(404).json(formatLogicError('profile', 'There is no profiles', err))

  if(!profiles) {
    errors.noprofile = 'There is no profiles'
    return res.status(400).json(errors)
  }

  res.status(200).json(profiles)
}

exports.PostAddExperience = async (req, res) => {
  const newExp = req.body
  const [errors, isValid] = validations.ValidateExperience(newExp)
  if(!isValid) return res.status(400).json(errors)

  const [err, profile] = await to(profileLogic.AddProfileExperience(req.user.id, newExp))
  if(err) return res.status(404).json(formatLogicError('profile', 'Cant update profile', err))
  
  res.status(200).json(profile)
}

exports.PostAddEducation = async (req, res) => {
  const newEdu = req.body
  const [errors, isValid] = validations.ValidateEducation(newEdu)
  if(!isValid) return res.status(400).json(errors)

  const [err, profile] = await to(profileLogic.AddProfileEducation(req.user.id, newEdu))
  if(err) return res.status(404).json(formatLogicError('profile', `Can't update profile`, err))
  
  res.status(200).json(profile)
}

exports.DeleteExperience  = async (req, res) => {
  const {experienceId} = req.params
  if(!experienceId) return res.sendStatus(400)

  const [err, profile] = await to(profileLogic.DeleteExperience(experienceId, req.user.id))
  if(err) return res.status(404).json(formatLogicError('error', `Can't remove experience`, err))

  res.status(200)
}

exports.DeleteEducation  = async (req, res) => {
  const {educationId} = req.params
  if(!educationId) return res.sendStatus(400)

  const [err, profile] = await to(profileLogic.DeleteEducation(educationId, req.user.id))
  if(err) return res.status(404).json(formatLogicError('error', `Can't remove education`, err))

  res.status(200)
}

exports.SetUserProfileStatus  = async (req, res) => {
  const [err, profile] = await to(profileLogic.SetProfileActiveStatus(req.user.id))
  if(err) return res.status(404).json(formatLogicError('error', `Can't remove profile`, err))

  res.status(200)
}
 