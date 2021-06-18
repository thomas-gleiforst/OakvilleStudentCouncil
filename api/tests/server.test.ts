import { createConnection, getConnection, getRepository } from "typeorm"
import request from "supertest"

import createServer from "../src/createServer"
import { Event } from "../src/entity/Event"
import { EventDate } from "../src/entity/EventDate"
import { QRCodes } from "../src/entity/QRCodes"

beforeEach((done) => {
  createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "ohsdev",
    password: "admin",
    database: "ohsdb",
    // logging: true,
    dropSchema: true,
    synchronize: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
  }).then(() => {
    done()
  })
})

afterEach((done) => {
  const connection = getConnection()
  connection.close().then(() => done())
})

const app = createServer()

describe("Events API", () => {
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
      room: "Room 329",
    })
    await dateRepository.save(date1)

    const date2 = dateRepository.create({
      event: newEvent,
      date: new Date("2021-06-14T21:32:39.267Z"),
      room: "Room 420",
    })
    await dateRepository.save(date2)

    const qr = qrRepository.create({
      event: newEvent,
      pointValue: 10,
    })
    await qrRepository.save(qr)

    const response = await request(app).get(`/event/${newEvent.id}`)

    expect(response.status).toBe(200)
    expect(response.body.id).toBe(newEvent.id)
    expect(response.body.name).toBe(newEvent.name)
    expect(response.body.description).toBe(newEvent.description)

    expect(response.body.eventDates.length).toBe(2)
    expect(response.body.eventDates[0].date).toBe("2021-06-17T21:27:45.966Z")
    expect(response.body.eventDates[0].room).toBe("Room 329")
    expect(response.body.eventDates[1].address).toBeNull()
  })
})
