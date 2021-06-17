import { Router, Request, Response } from "express"
import { getConnection, getRepository, getManager } from "typeorm"

import { User } from "../entity/User"

const router = Router()

/**
 * Returns the points that a student has
 * Requires these values in the request
 * email
 */
router.post("/student/:studentID/points", async (req: Request, res: Response) => {
  const request = req.body

  const points = await getConnection()
    .createQueryBuilder()
    .select("user.points")
    .from(User, "user")
    .where("user.id = :id", { email: request.userID })
    .getRawOne()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })
  return res.send(points)
})

/**
 * Updates student points
 * Requires these values in the request
 * email
 * pointUpdate
 */
router.put("/updatePoints", async (req, res) => {
  const request = req.body
  const userRepository = getRepository(User)
  const user = await userRepository.findOne({
    where: { id: request.userID },
  })

  if (!user) {
    return res.status(404).send("User not found!")
  }

  const newPoints: number = user.points + request.pointUpdate
  user.points = newPoints
  await userRepository.save(user)

  // Successful return
  return res.send(user)
})

/**
 * Returns the average number of points of all students
 */
router.get("/averagePoints", async (req, res) => {
  const rawData = await getManager().query("SELECT AVG(points) FROM STUDENT")

  return res.send(rawData)
})

/**
 * Returns the max point value of all students
 */
router.get("/maxPoints", async (req, res) => {
  const rawData = await getManager().query("SELECT MAX(points) FROM STUDENT")

  return res.send(rawData)
})

/**
 * Returns the sum of points of all students
 */
router.get("/sumPoints", async (req, res) => {
  const rawData = await getManager().query("SELECT SUM(points) FROM STUDENT")

  return res.send(rawData)
}) 

// Reset the points of a student to 0
router.put("/resetPoints", async (req, res) => {
  const request = req.body

  await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({ points: 0 })
    .where("id = :userID", { userID: request.userID })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send("Reset user points")
})

// Reset everyone's points
// TODO: Admin only move
router.put("/resetAllPoints", async (req, res) => {
  const request = req.body

  await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({ points: 0 })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send("Reset all points")
})

export default router
