import { Router, Request, Response } from "express"
import { getConnection, getRepository, getManager } from "typeorm"

import { User } from "../entity/User"
import { Attends } from "../entity/Attends"
import * as argon2 from "argon2"

const router = Router()

/**
 * Returns the students table with all attributes
 */
router.get("/allStudents", async (req: Request, res: Response) => {
  const users = await getRepository(User).find({
    where: { role: "student" },
  })
  return res.send({ users })
})

/**
 * Returns the admin table with all attributes
 */
router.get("/allAdmins", async (req: Request, res: Response) => {
  const admins = await getRepository(User).find({
    where: { role: "admin" },
  })
  return res.send({ admins })
})

/**
 * Get an existing student with email
 */
router.post("/student", async (req, res) => {
  const request = req.body

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
 * Get an existing admin with email
 */
router.post("/admin", async (req, res) => {
  const request = req.body

  const admin = await getRepository(User).find({
    where: {
      role: "admin",
      id: request.userID,
    },
  })

  return res.send(admin)
})

/**
 * Returns the points that a student has
 * Requires these values in the request
 * email
 */
router.post("/student/points", async (req: Request, res: Response) => {
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
router.post("/updatePoints", async (req, res) => {
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
 * Updates student points
 * Requires these values in the request
 * email
 * pointUpdate
 */
router.post("/updatePoints", async (req, res) => {
  const request = req.body
  const userRepository = getRepository(User)
  const user = await userRepository.findOne({
    where: { id: request.userID },
  })

  if (!user) {
    return res.status(404).send("Student not found!")
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
}) // Successful return

/**
 * Returns the max point value of all students
 */
router.get("/maxPoints", async (req, res) => {
  const rawData = await getManager().query("SELECT MAX(points) FROM STUDENT")

  return res.send(rawData)
}) // Successful return

/**
 * Returns the sum of points of all students
 */
router.get("/sumPoints", async (req, res) => {
  const rawData = await getManager().query("SELECT SUM(points) FROM STUDENT")

  return res.send(rawData)
}) // Successful return

/**
 * Login as a student
 * Normally better to not indicate whether email or password is wrong
 * but given the use case for this app, better UX is worth the tradeoff
 */
// TODO: Add login date timestamp
/*
router.post("/loginStudent", async (req, res) => {
  const request = req.body
  if (!request.password) return res.status(401).send("Needs a password")

  const student =
    (await getConnection()
      .createQueryBuilder()
      .select("")
      .addSelect("student.stuPass")
      .from(Student, "student")
      .where("student.email = :email", {
        email: request.email,
      })
      .getOne()) || null

  if (student) {
    const returnStudent = {
      email: student.email,
      id: student.id,
      firstName: student.firstName,
      middleName: student.middleName,
      lastName: student.lastName,
      loginDate: student.loginDate,
      joinDate: student.joinDate,
      points: student.points,
    }
    return res.send(returnStudent)
  } else {
    return res.status(401).send("Incorrect password.")
  }

  return res.status(401).send("Wrong email/password or account doesn't exist.")
})
*/

/**
 * Login as an admin
 */
// TODO: Add login date timestamp
/*
router.post("/loginAdmin", async (req, res) => {
  const request = req.body
  if (!request.password) return res.status(401).send("Needs a password")

  const admin =
    (await getConnection()
      .createQueryBuilder()
      .select("admin")
      .addSelect("admin.adminPass")
      .from(Admin, "admin")
      .where("admin.email = :email", {
        email: request.email,
      })
      .getOne()) || null

  if (admin) {
    const checkPasswordResult = await argon2.verify(
      admin.adminPass,
      request.password
    )

    if (checkPasswordResult) {
      const returnAdmin = {
        email: admin.email,
        firstName: admin.firstName,
        middleName: admin.middleName,
        lastName: admin.lastName,
        loginDate: admin.loginDate,
        joinDate: admin.joinDate,
      }
      return res.send(returnAdmin)
    } else {
      return res.status(401).send("Incorrect password.")
    }
  } else {
    return res
      .status(401)
      .send("Wrong email/password or account doesn't exist.")
  }
})
*/

/**
 * Delete a user from the database
 * POST request
 * email - ID of user to be deleted
 */

router.post("/deleteUser", async (req, res) => {
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

/**
 * Gets all events that a student went to
 */
router.post("/user/events", async (req: Request, res: Response) => {
  const request = req.body
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

// Reset the points of a student to 0
router.post("/resetPoints", async (req, res) => {
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

  // Successful return
  return res.send("Reset user points")
})

// Reset everyone's points
router.post("/resetAllPoints", async (req, res) => {
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

  // Successful return
  return res.send("Reset all points")
})

export default router
