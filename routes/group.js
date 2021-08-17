import { Router } from 'express'
import * as groupCtrl from '../controllers/groups.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

export {
  router
}

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// IF YOU NEED ACCESS TO req.user, IT MUST GO BENEATH:
router.use(decodeUserFromToken)
router.get('/', checkAuth, groupCtrl.index)
router.get('/:id', checkAuth, groupCtrl.show)
router.post('/createGroup', checkAuth, groupCtrl.create)
router.post('/joinGroup/:id', checkAuth, groupCtrl.join)
router.post('/leaveGroup/:id', checkAuth, groupCtrl.leaveGroup)
router.post('/addActivity/:id', checkAuth, groupCtrl.addActivity) //work on this
router.post('/joinActivity/:id', checkAuth, groupCtrl.joinActivity) //work on this