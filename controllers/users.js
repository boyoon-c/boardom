import { User } from "../models/user.js"
import { Profile } from "../models/profile.js"

export {
  index,
  userProfile,
  friend,
  unfriend
}

function index(req, res) {
  console.log(req.user)
  User.find({}).then((users) => res.json(users))
}

function userProfile(req, res) {
  Profile.findById(req.user.profile)
  .populate('friends')
  .then(profile => {
    res.json(profile)
  })
}

function friend(req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.friends.push(req.params.id)
    profile.save()
    profile.populate('friends').execPopulate()
    .then(()=> {
      res.json(profile)
    })
  })
}

function unfriend(req, res) {
  Profile.findById(req.user.profile)
  .populate('friends')
  .then(profile => {
    profile.friends.remove({ _id: req.params.id })
    profile.save()
    .then(()=> {
      res.json(profile)
    })
  })
}