import { Profile } from '../models/profile.js'
import { User } from '../models/user.js'
export{
  index,
  addFriend,
  unFriend,
  show
}

function index (req, res) {
  Profile.find({})
  .populate('activities')
  // if we need to populate it is good to play with the data around here
  .then(profiles => {
    res.json(profiles)
  })
}

function addFriend (req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.friends.push(req.params.id)
    profile.save()
    //if we need to populate here we can
    .then (() => {
      res.json(profile)
    })
  })
}

function unFriend (req, res) {
  Profile.findById(req.user.profile)
  .populate('friends')
  .then(profile => {
    profile.friends.remove({ _id: req.params.id })
    profile.save()
    .then(() => {
      res.json(profile)
    })
  })
}

function show(req, res) {
  //req.user.profile
  Profile.findById(req.params.id)
  .populate('friends')
  .then(profile => {
    res.json(profile)
  })
}

