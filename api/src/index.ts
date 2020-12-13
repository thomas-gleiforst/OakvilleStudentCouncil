import cors from 'cors'
import express, { Request, Response } from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'

// Route imports
import { eventApi, qrApi, userApi } from './routes'

// FIXME: New method of catching errors
createConnection().then((connection) => {
  // Create and setup Express app
  const app = express()
  const port = process.env.PORT || 8080
  // const port = 19006

  // TODO: Implement more strict CORS system for production
  app.use(cors())
  app.use(express.json()) // Expect a JSON response

  // Home route
  /*
  app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the StuCo API!')
  })
  */

  // User route
  app.use(userApi)
  // Event route
  app.use(eventApi)
  // QR route
  app.use(qrApi)

  // Start the server
  // This option will erase the database every time we start the server
  app.listen(port, () => {
    console.log(`Server running at port ${port}`)
  })
})
