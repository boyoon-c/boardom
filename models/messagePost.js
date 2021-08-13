import mongoose from 'mongoose'

export{
  MessagePost
}

//we may consider embedding the messages to Group
//bob sent a message in the cooking group

const messagePostSchema = new mongoose.Schema({
  body: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
  group: {type: mongoose.Schema.Types.ObjectId, ref: "Group"}

}, {
  timestamps: true
})

const MessagePost = mongoose.model('MessagePost', messagePostSchema)