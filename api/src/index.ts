import cors from "cors"
import express from "express"
import "reflect-metadata"
import { createConnection } from "typeorm"

import { authApi, eventApi, qrApi, userApi } from "./routes"
import { passport } from "./middleware/passportAuth"

// TODO: New method of catching errors + better logging
createConnection().then((connection) => {
  // Create and setup Express app
  const app = express()
  const port = process.env.PORT || 8080

  app.use(cors())
  app.use(express.json()) // Expect a JSON response

  app.use(passport.initialize())

  // Routes
  app.use(authApi)
  app.use(userApi)
  app.use(eventApi)
  app.use(qrApi)

  // Start the server
  app.listen(port, () => {
    console.log(`Server running at port ${port}`)
  })
})
