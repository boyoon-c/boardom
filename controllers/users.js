import { User } from "../models/user.js"

export {
  index,
  userProfile
}

function index(req, res) {
  console.log(req.user)
  User.find({})
  .then((users) => res.json(users))
}

function userProfile(req, res) {
  User.findById(req.user.profile)
  .then((profile => 
    res.json(profile)))
}