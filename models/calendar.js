import mongoose from 'mongoose'

export {
  Calendar
}

const calendarSchema = new mongoose.Schema({
  date: Date,
  time: Date,  //is this a number or a date?
  activities: [{type: mongoose.Schema.Types.ObjectId, ref: "Activity"}]
}, {
  timestamps: true
});

const Calendar = mongoose.model('Review', calendarSchema);