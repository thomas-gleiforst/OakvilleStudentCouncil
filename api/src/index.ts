import cors from 'cors'
import express, { Request, Response } from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'

// Route imports
import { eventApi, userApi } from './routes'

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
  app.use(eventApi)

  // Start the server
  // This option will erase the database every time we start the server
  app.listen(port, () => {
    console.log(`Server running at port ${port}`)
  })
})


/*
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));

*/