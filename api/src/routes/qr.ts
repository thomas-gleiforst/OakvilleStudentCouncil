import { Router, Request, Response } from "express"
import { getConnection, getRepository } from "typeorm"

import { Attends } from "../entity/Attends"
import { QRCodes } from "../entity/QRCodes"
import { User } from "../entity/User"

const router = Router()

/**
 * Marks a user as attended and will update their points
 * POST Request
 * email
 * eventID
 */
router.post("/markAttended", async (req: Request, res: Response) => {
  const request = req.body

  // See if user already attended event
  const attendedEvent = await getConnection()
    .createQueryBuilder()
    .select("attends")
    .from(Attends, "attends")
    .where("attends.email = :email", {
      email: request.email,
    })
    .execute()

  if (attendedEvent !== null) {
    return res.send("Student already attended this event!")
  }

  // Insert into attended table
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Attends)
    .values({
      id: request.userID,
      eventID: request.eventID,
    })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  // Update student's points for attending the event
  const userRepository = getRepository(User)
  const qrRespository = getRepository(QRCodes)
  const user = await userRepository.findOne({
    where: { id: request.userID },
  })

  if (!user) {
    return res.status(404).send("User doesn't exist, can't mark as attended!")
  }

  // Find QR entry for specified event and add that to the student's points
  const QR = await qrRespository.findOne({
    where: { eventID: request.eventID },
  })

  if (!QR) {
    return res.status(404).send("QR code not found!")
  }

  const newPoints: number = user.points + QR.pointValue
  user.points = newPoints
  await userRepository.save(user)

  return res.send("Student's attendance recorded")
})

/**
 * Returns QR Code entity
 * POST Request
 * eventId
 */
// TODO: Only admins allowed to get QR codes
router.post("/:eventID/qr", async (req: Request, res: Response) => {
  const request = req.params

  const viewQRCode = await getConnection()
    .createQueryBuilder()
    .select("qrcodes")
    .from(QRCodes, "qrcodes")
    .where("qrcodes.eventID = :eventID", { eventID: request.eventID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send(viewQRCode)
})


export default router
