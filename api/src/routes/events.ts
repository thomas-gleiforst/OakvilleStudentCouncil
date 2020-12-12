import { Router, Request, Response } from 'express'
import { getConnection, getRepository } from 'typeorm'

import { Event } from '../entity/Event'
import { Attends } from '../entity/Attends'
import { EventDate } from '../entity/EventDate'
import { Locations } from '../entity/Locations'
import { QRCodes } from '../entity/QRCodes'

const router = Router()

/**
 * Creates events
 * Requires these values in the request
 * eventName
 * event_desc - event description
 * eventDate
 * name
 * address
 * room
 * points
 */
// TODO: Allow frontend to supply date
// TODO: Test
router.post('/createEvent', async (req, res) => {
  const request = req.body
  //creates event in Events Table
  const eventRepository = getRepository(Event)

  const event = new Event()
  event.eventName = request.eventName
  event.event_desc = request.event_desc
  await eventRepository.insert(event)

  const newEventID: string = event.eventID

  //Sets date and eventID into Event_Dates table
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(EventDate)
    .values({
      eventID: newEventID,
      eventDate: request.eventDate,
    })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Locations)
    .values({
      eventID: newEventID,
      name: request.name,
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
 * Returns QR Code entity
 * Requires these values in the request
 * eventID
 */
//Returns event details for the event calendar
//TODO: Test
router.get('/events', async (req: Request, res: Response) => {
  const eventDetails = await getConnection()
    .createQueryBuilder()
    .select('event')
    .from(Event, 'event')
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
//TODO: Test
router.post('/eventDetails', async (req: Request, res: Response) => {
  const request = req.body
  const eventDetails = await getConnection()
    .createQueryBuilder()
    .select('event')
    .from(Event, 'event')
    .where('event.eventID = :givenEventID', {
      givenEventID: request.eventID,
    })
    .getMany()
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
// TODO: Return new event details
// TODO: Can you update certain attributes and leave others the same?
router.post('/events/updateDesc', async (req: Request, res: Response) => {
  const request = req.body

  await getConnection()
    .createQueryBuilder()
    .update(Event)
    .set({ event_desc: request.eventDesc })
    .where('eventID = :eventID', { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send('Updated event description')
})

/**
 * Updates the event name
 * Requires these values in the request
 * eventName - updated name for event
 * eventID
 */
router.post('/events/updateName', async (req: Request, res: Response) => {
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

// TODO: test
//Returns all attendees of the event
router.post('/events/viewAttendees', async (req: Request, res: Response) => {
  const request = req.body
  const points = await getConnection()

  const updateDetail = request.updateDetail

  await getConnection()
    .createQueryBuilder()
    .select('attends.email')
    .from(Attends, 'attends')
    .where('eventID = :eventID', { eventID: request.eventID })
    .getMany()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })
})

//TODO: test
//Deletes event from the database
router.post('/deleteEvent', async (req: Request, res: Response) => {
  const request = req.body
  const points = await getConnection()

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
    .where('eventID = :eventID', { email: request.eventID })
    .andWhere('eventDate = :date', { date: request.date })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(QRCodes)
    .where('eventID = :eventID', { email: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Locations)
    .where('eventID = :eventID', { email: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Event)
    .where('eventID = :eventID', { email: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })
})

export default router
