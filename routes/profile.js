import { Router } from 'express'
import * as profileCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


export {
  router
}

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// IF YOU NEED ACCESS TO req.user, IT MUST GO BENEATH:
// endpoint /api/profile/
router.use(decodeUserFromToken)
router.get('/userProfile', checkAuth, profileCtrl.userProfile)
router.get('/', checkAuth, profileCtrl.index) //double check
router.post('/addfriend/:id', checkAuth, profileCtrl.addFriend)
router.post('/unfriend/:id', checkAuth, profileCtrl.unFriend)
router.get('/:id', checkAuth, profileCtrl.show)