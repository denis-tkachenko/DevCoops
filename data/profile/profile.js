const Profile = require('../../models/Profile')

exports.AddProfile = profileFields => new Profile(profileFields).save()

exports.GetProfileByUserId = userId => Profile.findOne({user: userId, _deleted: false}).populate('user', ['name', 'avatar'])

exports.UpdateUserProfile = (userId, profileFields) => Profile.findOneAndUpdate({user: userId}, {$set: profileFields}, {new: true})

exports.GetProfileById = profileId => Profile.findOne({_id: profileId, _deleted: false}).populate('user', ['name', 'avatar'])

exports.GetProfileByHandle = handle => Profile.findOne({handle, _deleted: false}).populate('user', ['name', 'avatar'])

exports.GetAllProfiles = () => Profile.find({_deleted: false}).populate('user', ['name', 'avatar'])

exports.AddProfileExperience = (userId, newExp) => Profile.findOneAndUpdate({user: userId}, {$push: {experiance: newExp}}).populate('user', ['name', 'avatar'])

exports.AddProfileEducation = (userId, newEdu) => Profile.findOneAndUpdate({user: userId}, {$push: {education: newEdu}}).populate('user', ['name', 'avatar'])

exports.DeleteEducation = (userId, profileId, educationId) => Profile.findOneAndUpdate({_id: profileId, user: userId}, {$pull: {education: {_id: educationId}}})

exports.DeleteExperience = (userId, profileId, experienceId) => Profile.findOneAndUpdate({_id: profileId, user: userId}, {$pull: {experience: {_id: experienceId}}}) 

exports.SetProfileActiveStatus = (userId, profileId, status) => Profile.findOneAndUpdate({_id: profileId, user: userId}, {_deleted: status}) 