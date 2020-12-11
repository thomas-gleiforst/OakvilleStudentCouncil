import { Router, Request, Response } from 'express'
import { getConnection } from 'typeorm'

import { Event } from '../entity/Event'
import { Attends } from '../entity/Attends'
import { EventDate } from '../entity/EventDate'

const router = Router()

/**
 * Requires these values in the request
 * eventName
 * event_desc - event description
 * eventDate
 */

//Creates events
router.post('/createEvent', async (req, res) => {
  const request = req.body
  //creates event in Events Table
  let newEvent = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Event)
    .values({
      eventName: request.eventName,
      event_desc: request.event_desc,
    })
    .returning("eventID")
    .execute()
    .catch((error) => {
      // If there is an error
      console.log(error)
      return res.send(error)
    })

    //retrieves eventID from newly inserted event
    let insertedID = await getConnection()
    .createQueryBuilder()
    .select("eventID")
    .from(Event, "event")
    //Attempting to search through the events table to find one where the insert identifier matches the new one
    .where("InsertResult.identifiers = newEvent.identifiers")
    .execute()
    .catch((error) => {
      // If there is an error
      console.log(error)
      return res.send(error)
    });

    //Sets date and eventID into Event_Dates table
    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(EventDate)
    .values({
      eventID: insertedID,
      eventDate: request.eventDate,
    })
    .execute()
    .catch((error) => {
      // If there is an error
      console.log(error)
      return res.send(error)
    })

  // Successful return
  return res.send('Post request sent!')
})

//Returns event details for the event calendar
router.get('/events', async (req: Request, res: Response) => {
  const request = req.body
  const points = await getConnection()
    .createQueryBuilder()
    .select(['eventID', 'eventName'])
    .from(Event, 'event')
    .getMany()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send('Point values returned.')
})

/**
 * Requires these values in the request
 * eventID
 */

//Returns event details
router.post('/events/:Details', async (req: Request, res: Response) => {
  const request = req.body
  const points = await getConnection()
    .createQueryBuilder()
    .select('eventDetails')
    .from(Event, 'event')
    .where('event.eventDetails IN (:givenEventID)', {
      givenEventID: request.eventID,
    })
    .getMany()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send('Event details returned.')
})

/**
 * Requires these values in the request
 * Details - updated details for event
 * eventID
 */

//Updates the event description
router.post('/events/updateDesc', async (req: Request, res: Response) => {
  const request = req.body
  const points = await getConnection()

  await getConnection()
    .createQueryBuilder()
    .update(Event)
    .set({ event_desc: request.Details })
    .where('eventID = :eventID', { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })
})

/**
 * Requires these values in the request
 * Details - updated name for event
 * eventID
 */

//Updates the event name
router.post('/events/updateName', async (req: Request, res: Response) => {
  const request = req.body
  const points = await getConnection()

  await getConnection()
    .createQueryBuilder()
    .update(Event)
    .set({ eventName: request.Details })
    .where('eventID = :eventID', { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })
})

/**
 * Requires these values in the request
 * Details - updated name for event
 * eventID
 */

//Returns all attendees of the event
router.post('/events/viewAttendees', async (req: Request, res: Response) => {
  const request = req.body
  const points = await getConnection()

  const updateDetail = request.updateDetail

  await getConnection()
    .createQueryBuilder()
    .select('email')
    .from(Attends, 'attends')
    .where('eventID = :eventID', { eventID: request.eventID })
    .getMany()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })
})

export default router
