import { Router, Request, Response } from 'express'
import { getConnection, getRepository } from 'typeorm'

import { Event } from '../entity/Event'
import { Attends } from '../entity/Attends'
import { EventDate } from '../entity/EventDate'
import { Locations } from '../entity/Locations'
import { QRCodes } from '../entity/QRCodes'

import { insertEventDates } from '../utils/insertEventDates'

const router = Router()

/**
 * Creates events
 * Requires these values in the request
 * eventName
 * event_desc - event description
 * eventDates - Array of event dates formatted as (Date.toString())
 * locationName
 * address
 * room
 * points
 */
// TODO: Allow frontend to supply multiple date
router.post('/event', async (req, res) => {
  const request = req.body
  //creates event in Events Table
  const eventRepository = getRepository(Event)

  const event = new Event()
  event.eventName = request.eventName
  event.eventDesc = request.event_desc
  await eventRepository.save(event)
  // Grab the ID of a newly created date
  const newEventID: string = event.eventID

  //Sets date and eventID into Event_Dates table
  await insertEventDates(event, request.eventDates)

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Locations)
    .values({
      eventID: newEventID,
      name: request.locationName,
      address: request.address,
      room: request.room,
    })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(QRCodes)
    .values({
      eventID: newEventID,
      pointValue: request.points,
    })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  // Successful return
  return res.send(newEventID)
})

/**
 * Returns Event entity
 */
// TODO: Refactor to GET request
router.get('/event/all', async (req: Request, res: Response) => {
  const eventDetails = await getConnection()
    .getRepository(Event)
    .createQueryBuilder('event')
    .leftJoinAndSelect('event.eventDate','eventDate')
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
// TODO: Return more event details
router.get('/event/:eventID', async (req: Request, res: Response) => {
  const request = req.params
  const eventDetails = await getConnection()
    .createQueryBuilder()
    .select('event')
    .from(Event, 'event')
    .where('event.eventID = :givenEventID', {
      givenEventID: request.eventID,
    })
    .getOne()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send(eventDetails)
})

/**
 * Updates the event description
 * Requires these values in the request
 * eventID
 * eventDesc - updated details for event
 */
router.put('/event/update', async (req: Request, res: Response) => {
  const request = req.body

  const event = await getConnection()
    .createQueryBuilder()
    .update(Event)
    .set({ eventDesc: request.eventDesc })
    .where('eventID = :eventID', { eventID: request.eventID })
    .returning(['eventID', 'eventName', 'event_desc'])
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
router.put('/event/update', async (req: Request, res: Response) => {
  const request = req.body

  await getConnection()
    .createQueryBuilder()
    .update(Event)
    .set({ eventName: request.eventName })
    .where('eventID = :eventID', { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send('Updated event name')
})

/**
 * Requires these values in the request
 * Details - updated name for event
 * eventID
 */

//Returns all attendees of the event
// TODO: Nicer output
router.post('/event/:eventID/attendees', async (req: Request, res: Response) => {
  const request = req.params

  const attendees = await getConnection()
    .createQueryBuilder()
    .select('attends')
    .from(Attends, 'attends')
    .where('attends.eventID = :eventID', { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  console.log(attendees)
  return res.send(attendees)
})

router.post("/event/:eventID/locations", async (req: Request, res: Response) => {
  const request = req.params

  const location = await getConnection()
    .createQueryBuilder()
    .select("locations")
    .from(Locations, "locations")
    .where("locations.eventID = :eventID", { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send(location)
})

/**
 * Deletes event from the database
 * POST Request
 * eventID
 */
router.delete('/event/delete', async (req: Request, res: Response) => {
  const request = req.body

  const result = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Attends)
    .where('eventID = :eventID', { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(EventDate)
    .where('eventID = :eventID', { eventID: request.eventID })
    .execute()

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(QRCodes)
    .where('eventID = :eventID', { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Locations)
    .where('eventID = :eventID', { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Event)
    .where('eventID = :eventID', { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  // TODO: Send back event id and event name deleted

  res.send('Deleted event')
})

export default router
