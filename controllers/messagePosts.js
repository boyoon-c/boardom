import { MessagePost } from "../models/messagePost.js";
import { Profile } from "../models/profile.js";

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
    res.status(200)
    .json(messagePosts)
  })
}

function edit (req, res) {
  console.log('hitting messagePost/edit')
  MessagePost.findByIdAndUpdate(req.params.id, req.body, { new:true })
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
    // .json({
    //   message: `messagePost deleted successfully`,
    // })
  })
}

// function create (req, res) {
//   req.body.author = req.user.profile._id
//   MessagePost.create(req.body)
//   .then((message) => {
//     res.status(200)
//     .json(message)
//   })
// }

function create (req, res) {
  req.body.author = req.user.profile
  console.log('req.body' , req.body)  
  MessagePost.create(req.body)
  //.populate('author').execPopulate()
  .then((message) => {
  //  Profile.findById(req.body.author)
  //        .then(profile => {
  //          profile.messagePosts.push(message)
  //          .save()
//  .then(() => {
    res.status(200)
    .json(message)
   })
  //  })
  // })
}