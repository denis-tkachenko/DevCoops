const Profile = require('../../models/Profile')

exports.AddProfile = profileFields => new Profile(profileFields).save()

exports.GetUserProfileByUserId = userId => Profile.findOne({user: userId, _deleted: false}).populate('user', ['name', 'avatar'])

exports.GetProfileByHandle = handle => Profile.findOne({handle: handle})

exports.UpdateUserProfile = (userId, profileFields) => Profile.findOneAndUpdate({user: userId}, {$set: profileFields}, {new: true})

exports.GetProfileById = profileId => Profile.findById(profileId).populate('user', ['name', 'avatar'])

exports.GetProfileByHandle = handle => Profile.findOne({handle, _deleted: false}).populate('user', ['name', 'avatar'])

exports.GetAllProfiles = () => Profile.find({_deleted: false}).populate('user', ['name', 'avatar'])

exports.AddProfileExperience = (userId, newExp) => Profile.findOneAndUpdate({user: userId}, {$push: {experiance: newExp}}).populate('user', ['name', 'avatar'])

exports.AddProfileEducation = (userId, newEdu) => Profile.findOneAndUpdate({user: userId}, {$push: {education: newEdu}}).populate('user', ['name', 'avatar'])