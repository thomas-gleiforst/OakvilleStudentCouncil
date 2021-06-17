import { Router, Request, Response } from "express"
import { getConnection, getRepository, getManager } from "typeorm"

import { User } from "../entity/User"
import { Attends } from "../entity/Attends"

const router = Router()

/**
 * Returns the students table with all attributes
 */
// TODO: Maybe just limit to students and points
router.get("/student/all", async (req: Request, res: Response) => {
  const users = await getRepository(User).find({
    where: { role: "student" },
  })
  return res.send({ users })
})

/**
 * Returns the admin table with all attributes
 */
// TODO: Maybe one should restrict this path?
router.get("/admin/all", async (req: Request, res: Response) => {
  const admins = await getRepository(User).find({
    where: { role: "admin" },
  })
  return res.send({ admins })
})

/**
 * Get an existing student with email
 */
router.get("/profile/:userID", async (req, res) => {
  const request = req.params

  const student = await getRepository(User).find({
    where: {
      role: "student",
      id: request.userID,
    },
  })

  if (!student) {
    res.status(404).send("Student not found!")
  }

  return res.send(student)
})

/**
 * Gets all events that a student went to
 * 
 * Parameters
 * userID: string
 */
router.get("/user/:userID/events", async (req: Request, res: Response) => {
  const request = req.params

  const events = await getConnection()
    .createQueryBuilder()
    // .select("attends.eventID")
    .select("attends")
    .from(Attends, "attends")
    .where("attends.id = :searchID", { searchID: request.userID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send(events)
})

/**
 * Delete a user
 * 
 * Parameters
 * userID: string
 */
router.delete("/delete", async (req, res) => {
  const request = req.body

  const result = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Attends)
    .where("id = :id", { id: request.userID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("id = :id", { id: request.userID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  // Successful return
  return res.send(result)
})

export default router
