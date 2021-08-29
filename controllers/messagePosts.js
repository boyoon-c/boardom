import { MessagePost } from "../models/messagePost.js";
import { Profile } from "../models/profile.js";

export {
  create,
  deleteMessagePost as delete,
  edit,
  index
}


function edit (req, res) {
  console.log('hitting messagePost/edit')
  MessagePost.findByIdAndUpdate(req.params.id, req.body, { new:true })
  .populate('author')
  .then((message) => {
    res.status(200)
    .json(message)
  })
}

function deleteMessagePost (req, res) {
  MessagePost.findByIdAndDelete(req.params.id)
  .then((message) => {
    res.status(200)
    .json(message)
    })
  }
  
      
function create (req, res) {
  req.body.author = req.user.profile
  console.log('req.body' , req.body)  
  MessagePost.create(req.body)
  .then((message) => {
    res.status(200)
    .json(message)
    })
  }
          
  function index (req, res) {
        MessagePost.find({})
        .populate('author')
        .then(messagePosts => {
          res.status(200)
          .json(messagePosts)
        })
      }