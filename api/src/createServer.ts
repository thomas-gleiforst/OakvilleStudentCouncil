import cors from "cors"
import express from "express"
import "reflect-metadata"

import { authApi, eventApi, qrApi, userApi } from "./routes"
import { passport } from "./middleware/passportAuth"

// TODO: New method of catching errors + better logging
function createServer() {
  // Create and setup Express app
  const app = express()

  app.use(cors())
  app.use(express.json()) // Expect a JSON response

  app.use(passport.initialize())

  // Routes
  app.get(
    "/protected",
    passport.authenticate("jwt", { session: false }),
    (req, res) => res.send(req.user)
  )

  app.use(authApi)
  app.use(userApi)
  app.use(eventApi)
  app.use(qrApi)

  return app
}

export default createServer
