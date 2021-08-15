import { Activity } from '../models/activity.js'
import { Profile } from '../models/profile.js'
import axios from 'axios'

export {
  search,
  addActivity,
  removeActivity
}

function removeActivity (req, res) {
  Activity.findOne({ activityNo: req.params.id })
  .then(activity => {
    activity.peopleInActivity.remove({ _id: req.user.profile })
    activity.save()
  })
}

function addActivity (req, res) {
//adding user's profile _id to req.body (for creating a new resource)
req.body.collected_by = req.user.profile
//find the profile of the logged in user
Profile.findById(req.user.profile)
.then(profile => {
  //check to see if the activity exists in the database
  Activity.findOne({activityNo: req.body.activityNo})
  .then(activity =>  {
    //if a matching activity is found 
    if (activity) {
      //add the user's profile id to the activity collected_by
      activity.peopleInActivity.push(req.user.profile) //what will we put here for collected by 
      //saving the activity object
      activity.save()
      .then(activity => {
        //push the updated media document into the user's profile
        profile.activities.push(activity._id)
        profile.save()          //why save profile?
        //do a populate to keep userProfile accurate in <App> state
        profile.populate('activities').populate('friends').execPopulate()
        .then((profile) => {
          // sending back the freshly fully updataed, fully populated profile document
          res.json(profile)
        })
      })
      //if no match is found. then create a new media document
    } else {
      Activity.create(req.body)
      .then(activity => {
        //add the new media document to the user's profile
        profile.activities.push(activity._id) //profile media?
        profile.save()
        //populate to keep the user's profile current
        profile.populate('activities').populate('friends').execPopulate()
        .then((profile) => {
          //return the freshly updated and fully populated profie document
          res.json(profile)
        })
      })
    }
  })
})
}

function search (req, res) {
  axios.get(`https://www.boredapi.com/api/activity/?participants=${req.params.participants}&type=${req.params.type}`)
  .then(response => {
    res.json(response.data)
  })
}