import { createConnection, getRepository } from "typeorm"
import request from "supertest"

import createServer from "../src/createServer"
import { Event } from "../src/entity/Event"
import { EventDate } from "../src/entity/EventDate"
import { QRCodes } from "../src/entity/QRCodes"

beforeEach((done) => {
  createConnection({
    type: "postgres",
    username: "ohsJest",
    password: "haha",
    database: "ohsJestDB",
    dropSchema: true,
  }).then(() => {
    done()
  })
})

// afterEach((done) => {
//   // Close and drop database
// })

const app = createServer()

app.listen(8000, () => {
  console.log("Starting up server!")
})

test("GET /event", async () => {
  const eventRepository = getRepository(Event)
  const dateRepository = getRepository(EventDate)
  const qrRepository = getRepository(QRCodes)

  const newEvent = eventRepository.create({
    name: "Test event",
    description: "Over the skies and the mountains",
  })
  await eventRepository.save(newEvent)

  const date1 = dateRepository.create({
    event: newEvent,
    date: new Date("2021-06-17T21:27:45.966Z"),
    address: "1234 Great Bluffs Dr",
    room: "Room 329"
  })
  const date2 = dateRepository.create({
    event: newEvent,
    date: new Date("2021-06-14T21:32:39.267Z"),
    room: "Room 420"
  })
  await dateRepository.save([date1, date2])

  const qr = qrRepository.create({
    event: newEvent,
    pointValue: 10,
  })
  await qrRepository.save(qr)

  request(app)
    .get(`/event/${newEvent.id}`)
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body)).toBeTruthy()
      expect(response.body.length).toEqual(1)

      // Check the response data
      expect(response.body[0].eventID).toBe(newEvent.id)
      expect(response.body[0].name).toBe(newEvent.name)
      expect(response.body[0].desc).toBe(newEvent.description)
    })
})
