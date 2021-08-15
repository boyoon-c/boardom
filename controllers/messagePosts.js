import { MessagePost } from "../models/messagePost.js";

export {
  create,
  deleteMessagePost as delete,
  edit,
  index
}

function index (req, res) {
  MessagePost.find({})
  .populate('author')
  .then(messagePosts => {
    res.json(messagePosts)
  })
}

function edit (req, res) {
  MessagePost.findByIdAndUpdate(req.params.id, req.body, { new:true })
  .then((message) => {
    res.status(200)
    .json(message)
  })
}

function deleteMessagePost (req, res) {
  MessagePost.findByIdAndDelete(req.params.id)
  .then(() => {
    res.status(200)
    .json({
      message: `messagePost deleted successfully`,
    })
  })
}

function create (req, res) {
  req.body.author = req.user.profile._id
  MessagePost.create(req.body)
  .then((message) => {
    res.status(200)
    .json(message)
  })
}