import { Group } from '../models/group.js'
import { Profile } from '../models/profile.js'

export{
  index,
  createGroup as create,
  join
}

function join (req, res) {
  Group.findById(req.params.id)
  .then(group => {
    group.members.push(req.user.profile)
    .then((group) => {
      res.json(group)
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