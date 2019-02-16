const Profile = require('../../models/Profile')
const to = require('../../utilities/utilities').to

exports.GetUserProfileByUserId = userId => Profile.findOne({user: userId}).populate('user', ['name', 'avatar'])

exports.AddEditUserProfile = async (userId, profileFields) => {
  const [err, existingProfile] = await to(Profile.findOne({user: userId}))
  if(err) return Promise.reject(err)

  // Edit profile
  if(existingProfile) return await Profile.findOneAndUpdate({user: userId}, {$set: profileFields}, {new: true})

  // Add profile
  const profileHandle = await Profile.findOne({handle: profileFields.handle})
  if(profileHandle) return Promise.reject(['That handle alredy exists'])

  return new Profile(profileFields).save()
}

exports.GetProfileById = profileId => Profile.findById(profileId).populate('user', ['name', 'avatar'])

exports.GetProfileByHandle = handle => Profile.findOne({handle}).populate('user', ['name', 'avatar'])

exports.GetAllProfiles = _ => Profile.find().populate('user', ['name', 'avatar'])