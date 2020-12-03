import 'dotenv/config'
import cors from 'cors'
import express, { Request, Response } from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'

// Route imports
import { userApi } from './routes'

createConnection().then((connection) => {

  // Create and setup Express app
  const app = express()
  const port = process.env.PORT || 8080

  // TODO: Implement more strict CORS system for production
  app.use(cors())
  app.use(express.json()) // Expect a JSON response

  // Home route
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  // User route
  app.use(userApi)

  // Start the server
  // This option will erase the database every time we start the server
  app.listen(port, () => {
    console.log(`Server running at port ${port}`)
  })
})
