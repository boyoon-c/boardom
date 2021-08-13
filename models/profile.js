import mongoose from 'mongoose'

export {
  Profile
}

const profileSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    calendar: {type: mongoose.Schema.Types.ObjectId, ref: "Calendar"},
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: "Profile"}],
    completedActivities: [{type: mongoose.Schema.Types.ObjectId, ref: "Activity"}],
    messagePosts: [{type: mongoose.Schema.Types.ObjectId, ref: "MessagePost"}],
    groups: [{type: mongoose.Schema.Types.ObjectId, ref: "Group"}]
  },
  {
    timestamps: true,
  }
)

const Profile = mongoose.model('Profile', profileSchema)
