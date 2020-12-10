import { Router, Request, Response } from 'express'
import { getConnection } from 'typeorm'

import { Event } from '../entity/Event'

const router = Router()

router.post('/event', async (req, res) => {
  const request = req.body
  
  await getConnection()
  .createQueryBuilder()
  .insert()
  .into(Event)
  .values({
    eventName: request.eventName,
    event_desc: request.event_desc,
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

router.get('/events', async(req: Request, res: Response) => {
    const request = req.body
    const points = await getConnection()
    .createQueryBuilder()
    .select(["eventID", "eventName"])
    .from(Event, "event")
    .getMany()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    });
  
    return res.send('Point values returned.')
  })

  //TODO: how to pass in eventID
  router.get('/events/:Details', async(req: Request, res: Response) => {
    const request = req.body
    const points = await getConnection()
    .createQueryBuilder()
    .select("eventDetails")
    .from(Event, "event")
    .where("event.eventDetails IN (:givenEventID)", {givenEventID: 1})
    .getMany()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    });
  
    return res.send('Event details returned.')
  })

export default router
