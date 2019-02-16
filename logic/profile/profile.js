const Profile = require('../../models/Profile')
const initialiseObjectFields = require('../../utilities/utilities').initialiseObjectFields
const to = require('../../utilities/utilities').to
const moment = require('moment')

exports.GetUserProfileByUserId = userId => Profile.findOne({user: userId, _deleted: false}).populate('user', ['name', 'avatar'])

exports.AddEditUserProfile = async (userId, profileFields) => {
  const [err, existingProfile] = await to(Profile.findOne({user: userId}))
  if(err) return Promise.reject(err)

  formatProfileInfo(profileFields, userId)
  // Edit profile
  if(existingProfile) return await Profile.findOneAndUpdate({user: userId}, {$set: profileFields}, {new: true})

  // Add profile
  const profileHandle = await Profile.findOne({handle: profileFields.handle})
  if(profileHandle) return Promise.reject(['That handle alredy exists'])

  return new Profile(profileFields).save()
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

exports.GetProfileById = profileId => Profile.findById(profileId).populate('user', ['name', 'avatar'])

exports.GetProfileByHandle = handle => Profile.findOne({handle, _deleted: false}).populate('user', ['name', 'avatar'])

exports.GetAllProfiles = _ => Profile.find({_deleted: false}).populate('user', ['name', 'avatar'])

exports.AddProfileExperience = async (userId, newExp) => {
  initialiseObjectFields(['title', 'company', 'from', 'to', 'description', 'location'], newExp)

  !newExp.to && !newExp.current? newExp.current = true: newExp.current = false
  if(newExp.from) newExp.from = moment(newExp.from, 'DD/MM/YYYY').toDate()
  if(newExp.to) newExp.to = moment(newExp.to, 'DD/MM/YYYY').toDate()

  return Profile.findOneAndUpdate({user: userId}, {$push: {experiance: newExp}}).populate('user', ['name', 'avatar'])
}

exports.AddProfileEducation = async (userId, newEdu) => {              
  initialiseObjectFields(['school', 'degree', 'from'], newEdu)

  !newEdu.to && !newEdu.current? newEdu.current = true: newEdu.current = false
  if(newEdu.to) newEdu.to = moment(newEdu.to, 'DD/MM/YYYY').toDate()
  if(newEdu.from) newEdu.from = moment(newEdu.from, 'DD/MM/YYYY').toDate()

  return Profile.findOneAndUpdate({user: userId}, {$push: {education: newEdu}}).populate('user', ['name', 'avatar'])
}

exports.DeleteExperience = async (expId, userId) => {
  const [err, profile] = await to(Profile.findOne({user: userId}))
  if(err || !profile) return Promise.reject(err)

  profile.experiance = profile.experiance.filter(experiance => expId !== experiance.id.toString())

  return profile.save()
}

exports.DeleteEducation = async (educationId, userId) => {
  const [err, profile] = await to(Profile.findOne({user: userId}))
  if(err || !profile) return Promise.reject(err)

  profile.education = profile.education.filter(education => educationId !== education.id.toString())

  return profile.save()
}

exports.SetProfileActiveStatus = async (profileId, userId) => {
  const [err, profile] = await to(Profile.findOne({_id: profileId, user: userId}))
  if(err || !profile) return Promise.reject(err)

  profile._deleted = true
  return profile.save()
}
