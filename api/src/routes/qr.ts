import { Router, Request, Response } from 'express'
import { getConnection, getRepository } from 'typeorm'

import { Event } from '../entity/Event'
import { Attends } from '../entity/Attends'
import { QRCodes } from '../entity/QRCodes'

const router = Router()

/**
 * Marks a user as attended and will update their points
 * POST Request
 * email
 * eventID
 */
// TODO: Test
router.post('/markAttended', async (req: Request, res: Response) => {
  const request = req.body
  const viewQRCode = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Attends)
    .values({
      email: request.email,
      eventID: request.eventID,
    })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

    // TODO: Copy and paste updatePoints logic when we get it working

  return res.send(viewQRCode)
})

/**
 * Returns the necessary information to render and display a QR code
 * POST Request
 * eventId
 */
//TODO: Test
router.post('/viewBarcode', async (req: Request, res: Response) => {
  const request = req.body
  const viewQRCode = await getConnection()
    .createQueryBuilder()
    .select('qrcodes')
    .from(QRCodes, 'qrcodes')
    .where('eventID = :eventID', { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send(viewQRCode)
})

export default router
