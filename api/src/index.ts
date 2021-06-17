import { createConnection } from "typeorm"

import createServer from "./createServer"

createConnection().then(() => {
  const port = process.env.PORT || 8080
  const app = createServer()

  app.listen(port, () => {
    console.log("Starting up server!")
  })
})
