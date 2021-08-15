import { Group } from '../models/group.js'

export{
  index,
  createGroup as create,
  join
}

function join (req, res) {
  
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