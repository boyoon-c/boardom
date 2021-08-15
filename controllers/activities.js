import { Activity } from '../models/activity.js'
import { Profile } from '../models/profile.js'
import { Calendar } from '../models/calendar.js'
import axios from 'axios'

export {
  search,
  addActivity,
  removeActivity,
  createActivity
}

function createActivity (req, res) {
  Activity.create(req.body)
  .then((activity) => {
    res.json(activity)
  })
}

function removeActivity (req, res) {
  Activity.findOne({ activityNo: req.params.id })
  .then(activity => {
    activity.peopleInActivity.remove({ _id: req.user.profile })
    activity.save()
    .then(() => {
      Profile.findById(req.user.profile)
      .then(profile => {
        profile.activities.remove(activity._id)
        profile.save()
        .then(() => {
          res.json(profile)
        })
      })
    })
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
      //add the user's profile id to the activity peopeInActivity
      activity.peopleInActivity.push(req.user.profile) 
      //saving the activity object
      activity.save()
      .then(activity => {
        profile.activities.push(activity._id)
        profile.save() 
          .then((profile) => {
            res.json(profile)
          })
      })
    } else {
      Activity.create(req.body) // json body data from postman
      .then(activity => {
        //add the new activity document to the user's profile
       Profile.findById(req.user.profile)
        .then(profile => {
          profile.activities.push(activity._id) 
          profile.save()
          .then(profile => {
            activity.peopleInActivity.push(req.user.profile) //what will we put here for collected by 
              //saving the activity object
              activity.save()
              .then(() => {
                res.json(profile)

             })
          })
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