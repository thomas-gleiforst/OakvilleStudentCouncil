import { Router, Request, Response } from "express"
import { getConnection, getRepository } from "typeorm"

import { Event } from "../entity/Event"
import { Attends } from "../entity/Attends"
import { EventDate } from "../entity/EventDate"
import { QRCodes } from "../entity/QRCodes"

import { insertEventDates } from "../utils/insertEventDates"

const router = Router()

/**
 * Creates events
 * 
 * JSON body for request
 * name
 * description
 * date - Array of Javascript formatted dates
 * address
 * room
 * points
 */
router.post("/event", async (req, res) => {
  const request = req.body
  //creates event in Events Table
  const eventRepository = getRepository(Event)

  const event = new Event()
  event.name = request.name
  event.description = request.description
  await eventRepository.save(event)

  //Sets date and eventID into Event_Dates table
  try {
    const locationDetails = {
      address: request.address,
      room: request.room
    }
    await insertEventDates(event, request.eventDates, locationDetails)
  } catch (error) {
    res.status(500).send(error)
  }

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(QRCodes)
    .values({
      event: event,
      pointValue: request.points,
    })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  // Successful return
  return res.send(event.id)
})

/**
 * Returns Event entity
 */
router.get("/event/all", async (req: Request, res: Response) => {
  const eventDetails = await getConnection()
    .getRepository(Event)
    .createQueryBuilder("event")
    .leftJoinAndSelect("event.eventDate", "eventDate")
    .getMany()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send(eventDetails)
})

/**
 * Returns event details
 * Requires these values in the request
 * eventID
 */
router.get("/event/:eventID", async (req: Request, res: Response) => {
  const request = req.params
  const eventDetails = await getConnection()
    .createQueryBuilder()
    .select("event")
    .from(Event, "event")
    .where("event.eventID = :givenEventID", {
      givenEventID: request.eventID,
    })
    .getOne()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  const eventDates = await getRepository(EventDate).find({
    where: { event: eventDetails },
  })

  const returnObject = {
    ...eventDetails,
    eventDates: eventDates,
  }

  return res.send(returnObject)
})

/**
 * Updates the event description
 * Requires these values in the request
 * eventID
 * eventDesc - updated details for event
 */
router.put("/event/update", async (req: Request, res: Response) => {
  const request = req.body

  const event = await getConnection()
    .createQueryBuilder()
    .update(Event)
    .set({ description: request.eventDesc })
    .where("eventID = :eventID", { eventID: request.eventID })
    .returning(["eventID", "eventName", "event_desc"])
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send(event)
})

/**
 * Updates the event name
 * Requires these values in the request
 * eventName - updated name for event
 * eventID
 */
router.put("/event/update", async (req: Request, res: Response) => {
  const request = req.body

  await getConnection()
    .createQueryBuilder()
    .update(Event)
    .set({ name: request.eventName })
    .where("eventID = :eventID", { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send("Updated event name")
})

/**
 * Requires these values in the request
 * Details - updated name for event
 * eventID
 */

//Returns all attendees of the event
// TODO: Nicer output
router.post(
  "/event/:eventID/attendees",
  async (req: Request, res: Response) => {
    const request = req.params

    const attendees = await getConnection()
      .createQueryBuilder()
      .select("attends")
      .from(Attends, "attends")
      .where("attends.eventID = :eventID", { eventID: request.eventID })
      .execute()
      .catch((error) => {
        console.log(error)
        return res.send(error)
      })

    console.log(attendees)
    return res.send(attendees)
  }
)

/**
 * Deletes event from the database
 * POST Request
 * eventID
 */
// TODO: See if you can cascade delete automatically without manual deletion
router.delete("/event/delete", async (req: Request, res: Response) => {
  const request = req.body

  const result = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Attends)
    .where("eventID = :eventID", { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(EventDate)
    .where("eventID = :eventID", { eventID: request.eventID })
    .execute()

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(QRCodes)
    .where("eventID = :eventID", { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Event)
    .where("eventID = :eventID", { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  // TODO: Send back event id and event name deleted

  res.send("Deleted event")
})

export default router
