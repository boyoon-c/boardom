import { Router } from 'express'
import * as activityCtrl from '../controllers/activities.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

export { 
  router
 }


 /*---------- Public Routes ----------*/
 
 /*---------- Protected Routes ----------*/
 // IF YOU NEED ACCESS TO req.user, IT MUST GO BENEATH:
 //uri  /api/activity/search/:participants/:type
router.use(decodeUserFromToken)
router.get('/search/:participants/:type', checkAuth, activityCtrl.search) 
router.post('/addActivity', checkAuth, activityCtrl.addActivity) //not sure why it keeps adding the same activity will do later for testing
router.post('/createActivity', checkAuth, activityCtrl.createActivity) //creating works!
router.delete('/removeActivity/:id', checkAuth, activityCtrl.removeActivity) 






