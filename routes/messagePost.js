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
router.post('/', checkAuth, messagePostCtrl.create)