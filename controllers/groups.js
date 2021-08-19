import { Group } from '../models/group.js'
import { Profile } from '../models/profile.js'
import {Activity } from '../models/activity.js'

export{
  index,
  createGroup as create,
  join,
  leaveGroup,
  addActivity,
  joinActivity,
  show
}

function joinActivity (req, res) {
  console.log('join a group activity')
  console.log('req.params.id', req.params.id )
  console.log('req.body', req.body)
  Group.findById(req.params.id)
  .then((group) => {
    group.populate('activities')
      Activity.findOne({activityNo: req.body.key})
        .then((activity) => {
          console.log("activity in findone", activity)
          Profile.findById(req.params.id)
          .then((profile) =>{
            activity.peopleInActivity.push(req.user.profile)
            activity.save()
            .then(() => {
              res.json(activity)

          })
          })
        })
    })
}

function addActivity (req, res) {
  req.body.name=req.body.activity
  req.body.activityNo=req.body.key
  Group.findById(req.params.id)
    .then(group => {
  Activity.findOne({activityNo: req.body.key})
    .then(activity => {
  if (activity) {
      activity.peopleInActivity.push(req.user.profile)
      activity.save()
        .then(activity => {
          group.activities.push(activity._id)
          group.save()
            .then((group) => {
              res.json(group)
         })
      })
    } else {
      Activity.create(req.body)
        .then(activity => {
      Group.findById(req.params.id)
        .then(group => {
          group.activities.push(activity)
          group.save()
            .then(group => group.populate('activities').execPopulate())
            .then(group => {
              activity.peopleInActivity.push(req.user.profile)
              activity.save()
                .then(() => {
                  res.json(group)
                })
            })
        })
      })
    }
  })
})
}

function leaveGroup (req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
  Group.findById(req.params.id )
  .then (group => {
    group.members.remove(req.user.profile)
    group.save()
    .then(() =>{
      profile.groups.remove({ _id: req.params.id})
      profile.save()
      .then(() =>{
        res.json(group)
        })
      })
    })
  })
}

function join (req, res) {
  console.log('hitting the route')
  Profile.findById(req.user.profile)
  .then(profile => {
    Group.findById(req.params.id)
    //.populate('members')
    .then(group => {
    profile.groups.push(group._id)
    profile.save()
    .then(() => {
    group.members.push(req.user.profile)
    group.save()
    .then(() => {
      res.json(group)
      })
    })
  })
})
}

function createGroup (req, res) {
  Group.create(req.body)
  .then((group) => {
    res.json(group)
  })
}

function index (req, res) {
  Group.find({})
  .then(group => {
    res.json(group)
  })
}

function show(req, res) {
  Group.findById(req.params.id)
  .populate('members')
  .populate('activities')//.execPopulate()
  .then(group => {
    res.json(group)
  })
}