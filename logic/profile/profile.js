
const profileRepository = require('../../data/profile/profile')
const initialiseObjectFields = require('../../utilities/utilities').initialiseObjectFields
const to = require('../../utilities/utilities').to
const moment = require('moment')

exports.GetUserProfileByUserId = userId => profileRepository.GetUserProfileByUserId(userId)

exports.AddEditUserProfile = async (userId, profileFields) => {
  const [err, existingProfile] = await to(profileRepository.GetUserProfileByUserId(userId))
  if(err) return Promise.reject(err)

  formatProfileInfo(profileFields, userId)
  // Edit profile
  // if(existingProfile) return await profileRepository.UpdateUserProfile(userId, profileFields)

  // Add profile
  const profileHandle = await profileRepository.GetProfileByHandle(profileFields.handle)
  if(profileHandle) return Promise.reject(['That handle alredy exists'])

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

exports.GetProfileByHandle = handle => profileRepository.GetProfileByHandle(handel)

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
  const [err, profile] = await to(profileRepository.GetProfileByUserId(userId))
  if(err || !profile) return Promise.reject(err)

  profile.experiance = profile.experiance.filter(experiance => experienceId !== experiance.id.toString())

  return profileRepository.SaveSchema(profile)
}

exports.DeleteEducation = async (educationId, userId) => {
  const [err, profile] = await to(profileRepository.GetUserProfileByUserId(userId))
  if(err || !profile) return Promise.reject(err)

  profile.education = profile.education.filter(education => educationId !== education.id.toString())

  return profileRepository.SaveSchema(profile)
}

exports.SetProfileActiveStatus = async userId => {
  const [err, profile] = await to(profileRepository.GetProfileByUserId(userId))
  if(err || !profile) return Promise.reject(err)

  profile._deleted = true
  return profileRepository.SaveSchema(profile)
}
