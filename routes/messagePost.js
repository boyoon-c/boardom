import { Router } from 'express'
import * as messagePostCtrl from '../controllers/messagePosts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

export {
  router
}

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// IF YOU NEED ACCESS TO req.user, IT MUST GO BENEATH:
router.use(decodeUserFromToken)
// endpoint /api/messagePost/
router.get('/', checkAuth, messagePostCtrl.index)
router.post('/', checkAuth, messagePostCtrl.create)
router.delete('/deleteMessagePost/:id', checkAuth, messagePostCtrl.delete) //:id is the database _id
router.put('/edit/:id', checkAuth, messagePostCtrl.edit)