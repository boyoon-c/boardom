import mongoose from 'mongoose'

export {
  Activity
}

const activitySchema = new mongoose.Schema({
  name: String,
  type: String,
  participants: {type: Number, min: 1, max: 5, default:1},
  peopleInActivity: [{type: mongoose.Schema.Types.ObjectId, ref: "Profile"}]
  //may want to reference group?
}, {
  timestamps: true
});

const Activity = mongoose.model('activity', activitySchema);