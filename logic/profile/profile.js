
const profileRepository = require('../../data/profile/profile')
const initialiseObjectFields = require('../../utilities/utilities').InitialiseObjectFields
const moment = require('moment')
const to = require('../../utilities/utilities').To

exports.GetProfileByUserId = userId => profileRepository.GetProfileByUserId(userId)

exports.AddEditUserProfile = async (userId, profileFields) => {
  const existingProfile = await to(profileRepository.GetProfileByUserId(userId))
  if(!existingProfile) return null

  formatProfileInfo(profileFields, userId)
  // Edit profile
  if(existingProfile) return await profileRepository.UpdateUserProfile(userId, profileFields)//TODO: implement- fields for update

  // Add profile
  const profileHandle = await profileRepository.GetProfileByHandle(profileFields.handle)
  if(profileHandle) return {err: 'That handle alredy exists'}

  return profileRepository.AddProfile(profileFields)
}

function formatProfileInfo(profileFields, userId) {
  const socialMedias = ['youtube', 'twitter', 'facebook', 'linkedin', 'instagram']
  profileFields.social = {}
  profileFields.user = userId

  socialMedias.forEach(socialMedia => {
    if(profileFields[socialMedia]) {
      profileFields.social[socialMedia] = profileFields[socialMedia]
      delete profileFields[socialMedia]
    }
  })

  if(profileFields.skills !== 'undefined') profileFields.skills = profileFields.skills.split(',')
}

exports.GetProfileById = profileId => profileRepository.GetProfileById(profileId)

exports.GetProfileByHandle = handle => profileRepository.GetProfileByHandle(handle)

exports.GetAllProfiles = () => profileRepository.GetAllProfiles()

exports.AddProfileExperience = async (userId, newExp) => {
  initialiseObjectFields(['title', 'company', 'from', 'to', 'description', 'location'], newExp)

  !newExp.to && !newExp.current? newExp.current = true: newExp.current = false
  if(newExp.from) newExp.from = moment(newExp.from, 'DD/MM/YYYY').toDate()
  if(newExp.to) newExp.to = moment(newExp.to, 'DD/MM/YYYY').toDate()

  return profileRepository.AddProfileExperience(userId, newExp)
}

exports.AddProfileEducation = async (userId, newEdu) => {              
  initialiseObjectFields(['school', 'degree', 'from'], newEdu)

  !newEdu.to && !newEdu.current? newEdu.current = true: newEdu.current = false
  if(newEdu.to) newEdu.to = moment(newEdu.to, 'DD/MM/YYYY').toDate()
  if(newEdu.from) newEdu.from = moment(newEdu.from, 'DD/MM/YYYY').toDate()

  return profileRepository.AddProfileEducation(userId, newEdu)
}

exports.DeleteExperience = async (experienceId, userId) => {
  const profile = await to(profileRepository.GetProfileByUserId(userId))
  if(!profile) return null

  return profileRepository.DeleteExperience(userId, profile._id.toString(), experienceId)
}

exports.DeleteEducation = async (educationId, userId) => {
  const profile = await to(profileRepository.GetProfileByUserId(userId))
  if(!profile) return null

  return profileRepository.DeleteEducation(userId, profile._id.toString(), educationId)
}

exports.SetProfileActiveStatus = async userId => {
  const profile = await to(profileRepository.GetProfileByUserId(userId))
  if(!profile) return null

  return profileRepository.SetProfileActiveStatus(userId, profile._id, true)
}
