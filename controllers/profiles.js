import { Profile } from '../models/profile.js'

export{
  index,
  addFriend,

}

function index (req, res) {
  Profile.find({})
  .populate('friends')
  .populate('activities')
  .populate('groups')
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