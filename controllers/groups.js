import { Group } from '../models/group.js'
import { Profile } from '../models/profile.js'

export{
  index,
  createGroup as create,
  join
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