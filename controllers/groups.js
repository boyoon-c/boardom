import { Group } from '../models/group.js'

export{
  index
}

function index (req, res) {
  Group.find({})
  .then(group => {
    res.json(group)
  })
}