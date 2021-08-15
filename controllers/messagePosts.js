import { MessagePost } from "../models/messagePost.js";

export {
  create,

}

function create (req, res) {
  req.body.author = req.user.profile._id
  MessagePost.create(req.body)
  .then((message) => {
    res.json(message)
  })
}