const profileLogic = require('../../logic/profile/profile')
const validations = require('../../validation/profile')
const to = require('../../utilities/utilities').To

exports.GetUserProfile = async (req, res) => {
  const result = await to(profileLogic.GetProfileByUserId(req.user.id))
  if(!result) return res.status(404).json({profile: 'There is no profile for this user'})

  res.status(200).json(result)
}

exports.PostUserProfile = async (req, res) => {
  const [errors, isValid] = validations.ValidateProfileInput(req.body)
  if(!isValid) return res.status(400).json(errors)

  const result = await to(profileLogic.AddEditUserProfile(req.user.id, req.body))
  if(!result || result.err) return res.status(404).json({profile: result.err || 'Somthing went wrong!'})

  res.status(200).json(result)
}

exports.GetProfileByHandle = async (req, res) => {
  const {handle} = req.params, errors = {}
  if(!handle) return res.sendStatus(400)

  const result = await to(profileLogic.GetProfileByHandle(handle))
  if(!result) return res.status(404).json({profile: 'There is no profile for this handle'})
  
  res.status(200).json(result)
}

exports.GetProfileById = async (req, res) => {
  const {profileId} = req.params, errors = {}
  if(!profileId) return res.sendStatus(400)

  const result = await to(profileLogic.GetProfileById(profileId))
  if(!result) return res.status(404).json({profile: 'There is no profile'})

  res.status(200).json(result)
}

exports.GetAllProfiles = async (req, res) => {
  const result = await to(profileLogic.GetAllProfiles()), errors = {}
  if(!result) return res.status(404).json({profile: 'There is no profiles'})

  res.status(200).json(result)
}

exports.PostAddExperience = async (req, res) => {
  const newExp = req.body
  const [errors, isValid] = validations.ValidateExperience(newExp)
  if(!isValid) return res.status(400).json(errors)

  const result = await to(profileLogic.AddProfileExperience(req.user.id, newExp))
  if(!result) return res.status(404).json({profile: 'Cant update profile'})
  
  res.status(200).json(result)
}

exports.PostAddEducation = async (req, res) => {
  const newEdu = req.body
  const [errors, isValid] = validations.ValidateEducation(newEdu)
  if(!isValid) return res.status(400).json(errors)

  const result = await to(profileLogic.AddProfileEducation(req.user.id, newEdu))
  if(!result) return res.status(404).json({profile: `Can't update profile`})
  
  res.status(200).json(result)
}

exports.DeleteExperience  = async (req, res) => {
  const {experienceId} = req.params
  if(!experienceId) return res.sendStatus(400)

  const result = await to(profileLogic.DeleteExperience(experienceId, req.user.id))
  if(!result) return res.status(404).json({profile: `Can't remove experience`})

  res.sendStatus(200)
}

exports.DeleteEducation  = async (req, res) => {
  const {educationId} = req.params
  if(!educationId) return res.sendStatus(400)

  const result = await to(profileLogic.DeleteEducation(educationId, req.user.id))
  if(!result) return res.status(404).json({profile: `Can't remove education`})

  res.sendStatus(200)
}

exports.SetUserProfileStatus  = async (req, res) => {
  const result = await to(profileLogic.SetProfileActiveStatus(req.user.id))
  if(!result) return res.status(404).json({profile: `Can't remove profile`})

  res.sendStatus(200)
}
 