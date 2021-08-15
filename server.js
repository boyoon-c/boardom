import 'dotenv/config.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import logger from 'morgan'
import cors from 'cors'

import { router as usersRouter } from './routes/users.js'
import { router as authRouter } from './routes/auth.js'
import { router as activityRouter } from './routes/activity.js' //(bo) this should later reference the exact name of the file in the back end
import { router as messagePostRouter } from './routes/messagePost.js'
import { router as calendarRouter } from './routes/calendar.js'
import { router as profileRouter } from './routes/profile.js'
import { router as groupRouter } from './routes/group.js'

import('./config/database.js')

const app = express()


app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)),'build')))
app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/activity', activityRouter) //(bo) this one I added for activity route in the backend
app.use('/api/messagePost', messagePostRouter)
app.use('/api/calendar', calendarRouter)
app.use('/api/profile', profileRouter)
app.use('/api/group', groupRouter)

app.get("/*", function (req, res) {
	res.sendFile(
		path.join(path.dirname(fileURLToPath(import.meta.url)), "build", "index.html")
	)
})

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Express is listening on port ${port}.`)
})
