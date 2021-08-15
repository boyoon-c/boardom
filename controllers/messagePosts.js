import { MessagePost } from "../models/messagePost.js";

export {
  create,
  deleteMessagePost as delete
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
    res.json(message)
  })
}