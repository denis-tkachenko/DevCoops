const Profile = require('../../models/Profile')
const to = require('../../utilities/utilities').to

exports.GetUserProfileById = userId => Profile.findOne({user: userId})

exports.AddEditUserProfile = async (userId, profileFields) => {
  const existingProfile = await to(Profile.findOne({user: userId}))

  // Edit profile
  if(existingProfile)
    return await Profile.findOneAndUpdate({user: userId}, {$set: profileFields}, {new: true})

  // Add profile
  const profileHandle = await Profile.findOne({handle: profileFields.handle})
  if(profileHandle) return {err: 'That handle alredy exists'}

  return new Profile(profileFields).save()
}