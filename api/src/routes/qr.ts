import { Router, Request, Response } from 'express'
import { getConnection, getRepository } from 'typeorm'

import { Event } from '../entity/Event'
import { Attends } from '../entity/Attends'
import { Locations } from '../entity/Locations'
import { QRCodes } from '../entity/QRCodes'
import { Student } from '../entity/Student'

const router = Router()

/**
 * Marks a user as attended and will update their points
 * POST Request
 * email
 * eventID
 */
router.post('/markAttended', async (req: Request, res: Response) => {
  const request = req.body

  // Insert into attended table
  await getConnection()
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

  // Update student's points for attending the event
  const studentRepository = getRepository(Student)
  const qrRespository = getRepository(QRCodes)
  const student = await studentRepository.findOne({
    where: { email: request.email },
  })
  // Find QR entry for specified event and add that to the student's points
  const QR = await qrRespository.findOne({
    where: { eventID: request.eventID },
  })
  const newPoints: number = student.points + QR.pointValue
  student.points = newPoints
  await studentRepository.save(student)

  return res.send(student)
})

/**
 * Returns QR Code entity
 * POST Request
 * eventId
 */
router.post('/viewBarcode', async (req: Request, res: Response) => {
  const request = req.body

  const viewQRCode = await getConnection()
    .createQueryBuilder()
    .select('qrcodes')
    .from(QRCodes, 'qrcodes')
    .where('qrcodes.eventID = :eventID', { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send(viewQRCode)
})

// No need for this yet
router.post('/viewLocations', async (req: Request, res: Response) => {
  const request = req.body

  const location = await getConnection()
    .createQueryBuilder()
    .select('locations')
    .from(Locations, 'locations')
    .where('locations.eventIDeventId = :eventID', { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send(location)
})

export default router
