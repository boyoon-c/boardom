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
  //req.body.name = req.body.activity
  //adding user's profile _id to req.body (for creating a new resource)
  req.body.collected_by = req.user.profile
//find the profile of the logged in user
Profile.findById(req.user.profile)
//.populate('activities')
.then(profile => {
  //check to see if the activity exists in the database
  Activity.findOne({activityNo: req.body.key})
  .then(activity =>  {
    //if a matching activity is found 
    if (activity) {
      //add the user's profile id to the activity peopeInActivity
      activity.peopleInActivity.push(req.user.profile) 
      //saving the activity object
      activity.save()
      //(bo) feel like we should use populate here 
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
        //activity.name=req.body.activity
        //console.log('else statement req.body.activity', activity)
       
        //add the new activity document to the user's profile
       Profile.findById(req.user.profile)
       //.populate('activities')
        .then(profile => {
          //console.log('else statement req.body.profile', profile)

          profile.activities.push(activity) 
          profile.save()
          
          .then(profile => profile.populate('activities').execPopulate())
          .then(profile => {
            //console.log('else statement req.body.profile.save', profile)
            activity.peopleInActivity.push(req.user.profile) //what will we put here for collected by 
            //activity.name=req.body.activity
            //console.log('else statement 10', activity)

              //saving the activity object
              activity.save()
              //console.log('11', activity)
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