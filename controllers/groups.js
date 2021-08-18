import { Group } from '../models/group.js'
import { Profile } from '../models/profile.js'

export{
  index,
  createGroup as create,
  join,
  leaveGroup,
  addActivity,
  joinActivity,
  show
}

function joinActivity (req, res) {
  //people in activity
}

function addActivity (req, res) {
//work on this
}

function leaveGroup (req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
  Group.findById(req.params.id )
  .then (group => {
    group.members.remove(req.user.profile)
    group.save()
    .then(() =>{
      profile.groups.remove({ _id: req.params.id})
      profile.save()
      .then(() =>{
        res.json(group)
        })
      })
    })
  })
}

function join (req, res) {
  console.log('hitting the route')
  Profile.findById(req.user.profile)
  .then(profile => {
    Group.findById(req.params.id)
    //.populate('members')
    .then(group => {
    profile.groups.push(group._id)
    profile.save()
    .then(() => {
    group.members.push(req.user.profile)
    group.save()
    .then(() => {
      res.json(group)
      })
    })
  })
})
}

function createGroup (req, res) {
  Group.create(req.body)
  .then((group) => {
    res.json(group)
  })
}

function index (req, res) {
  Group.find({})
  .then(group => {
    res.json(group)
  })
}

function show(req, res) {
  Group.findById(req.params.id)
  .populate('members')
  //.populate('activities')//.execPopulate()
  .then(group => {
    res.json(group)
  })
}