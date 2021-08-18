import { Activity } from '../models/activity.js'
import { Profile } from '../models/profile.js'
import { Calendar } from '../models/calendar.js'
import axios from 'axios'

export {
  updateActivity,
  search,
  addActivity,
  removeActivity,
  createActivity
}

function updateActivity(req,res){
  Activity.findByIdAndUpdate(req.params.id, req.body, { new:true })
  .then((activity) => {
    res.status(200)
    .json(activity)
  })

}

function createActivity (req, res) {
  Activity.create(req.body)
  .then((activity) => {
    res.json(activity)
  })
}

function removeActivity (req, res) {
  console.log('removeAct', req.params)
  //Activity.findOne({ activityNo: req.params.id })
  Activity.findOne({ _id : req.params.id })
  .then(activity => {
    activity.peopleInActivity.remove({ _id: req.user.profile })
    activity.save()
    .then(() => {
      Profile.findById(req.user.profile)
      .then(profile => {
        profile.activities.remove(activity)
        profile.save()
        .then(profile=> profile.populate('activities').execPopulate())
        .then((profile) => {
          res.json(profile)
        })
      })
    })
  })
}

function addActivity (req, res) {
  console.log("addActivity function req.body",req.body)
  req.body.collected_by = req.user.profile
Profile.findById(req.user.profile)
.then(profile => {
  Activity.findOne({activityNo: req.body.key})
  .then(activity =>  {
    if (activity) {
      activity.peopleInActivity.push(req.user.profile) 
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
       Profile.findById(req.user.profile)
        .then(profile => {
          profile.activities.push(activity) 
          profile.save()
          .then(profile => profile.populate('activities').execPopulate())
          .then(profile => {
            activity.peopleInActivity.push(req.user.profile) //what will we put here for collected by 
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