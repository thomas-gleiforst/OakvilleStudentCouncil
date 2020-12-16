import { Router, Request, Response } from "express"
import { getConnection, getRepository, getManager } from "typeorm"

import { Student } from "../entity/Student"
import { Admin } from "../entity/Admin"
import { Attends } from "../entity/Attends"
import * as argon2 from "argon2"

const router = Router()

/**
 * Returns the students table with all attributes
 */
router.get("/allStudents", async (req: Request, res: Response) => {
  const users = await getConnection().getRepository(Student).find()
  return res.send({ users })
})

/**
 * Returns the admin table with all attributes
 */
router.get("/allAdmins", async (req: Request, res: Response) => {
  const admins = await getConnection().getRepository(Admin).find()
  return res.send({ admins })
})

/**
 * Get an existing student with email
 */
router.post("/student", async (req, res) => {
  const request = req.body

  const student = await getConnection()
    .createQueryBuilder()
    .select("student")
    .from(Student, "student")
    .where("student.email = :email", { email: request.email })
    .getOne()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send(student)
})

/**
 * Get an existing admin with email
 */
router.post("/admin", async (req, res) => {
  const request = req.body

  const admin = await getConnection()
    .createQueryBuilder()
    .select("admin")
    .from(Admin, "admin")
    .where("student.email = :email", { email: request.email })
    .getOne()
    .catch((error) => {
      console.log(error)
      return res.send(error)
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
    .select("student.points")
    .from(Student, "student")
    .where("student.email = :email", { email: request.email })
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
  const studentRepository = getRepository(Student)
  const student = await studentRepository.findOne({
    where: { email: request.email },
  })
  const newPoints: number = student.points + request.pointUpdate
  student.points = newPoints
  await studentRepository.save(student)

  // Successful return
  return res.send(student)
})

/**
 * Updates student points
 * Requires these values in the request
 * email
 * pointUpdate
 */
router.post("/updatePoints", async (req, res) => {
  const request = req.body
  const studentRepository = getRepository(Student)
  const student = await studentRepository.findOne({
    where: { email: request.email },
  })
  const newPoints: number = student.points + request.pointUpdate
  student.points = newPoints
  await studentRepository.save(student)

  // Successful return
  return res.send(student)
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
router.post("/loginStudent", async (req, res) => {
  const request = req.body
  if (!request.password) return res.status(401).send("Needs a password")

  const student =
    (await getConnection()
      .createQueryBuilder()
      .select("student")
      .addSelect("student.stuPass")
      .from(Student, "student")
      .where("student.email = :email", {
        email: request.email,
      })
      .getOne()) || null

  if (student) {
    const checkPasswordResult = await argon2.verify(
      student.stuPass,
      request.password
    )

    if (checkPasswordResult) {
      delete student["stuPass"]
      return res.send(student)
    } else {
      return res.status(401).send("Incorrect password.")
    }
  }

  return res.status(401).send("Wrong email/password or account doesn't exist.")
})

/**
 * Login as an admin
 */
// TODO: Add login date timestamp
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
      delete admin["adminPass"]
      return res.send(admin)
    } else {
      return res.status(401).send("Incorrect password.")
    }
  } else {
    return res
      .status(401)
      .send("Wrong email/password or account doesn't exist.")
  }
})

/**
 * Student account registration
 */
// TODO: Add server side validation for passwords
router.post("/newStudent", async (req, res) => {
  const request = req.body
  if (!request.stuPass) return res.status(401).send("Needs a password")
  const hashPass = await argon2.hash(request.stuPass)

  const result = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Student)
    .values({
      email: request.email,
      stuPass: hashPass,
      firstName: request.firstName,
      middleName: request.middleName,
      lastName: request.lastName,
      loginDate: Date(),
      points: 0,
    })
    .execute()
    .catch((error) => {
      // If there is an error
      console.log(error)
      return res.send(error)
    })

  // TODO: Return JWT along with basic student information
  delete result["stuPass"]
  return res.send(result)
})

/**
 * Create a new admin account
 */
// TODO: Add server side validation for passwords
router.post("/newAdmin", async (req, res) => {
  const request = req.body
  if (!request.adminPass) return res.status(401).send("Needs a password")
  const hashPass = await argon2.hash(request.adminPass)

  const result = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Admin)
    .values({
      email: request.email,
      adminPass: hashPass,
      firstName: request.firstName,
      middleName: request.middleName,
      lastName: request.lastName,
      loginDate: Date(),
    })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  // TODO: Return JWT along with basic student information
  delete result["adminPass"]
  return res.send(result)
})

/**
 * Delete a student from the database
 * POST request
 * email - Email of student to be deleted
 */

router.post("/delStudent", async (req, res) => {
  const request = req.body

  const result = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Attends)
    .where("email = :email", { email: request.email })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Student)
    .where("email = :email", { email: request.email })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  // Successful return
  return res.send(result)
})

/** Delete an admin from the database
 * POST Request
 * email - Email of admin to be deleted
 */
router.post("/delAdmin", async (req, res) => {
  const request = req.body

  const result = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Admin)
    .where("email = :email", { email: request.email })
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
  const eventIds = await getConnection()
    .createQueryBuilder()
    .select("attends.eventID")
    .from(Attends, "attends")
    .where("user.email IN (:...searchemail)", { searchemail: request.email })
    .getMany()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send("Point values returned.")
})

// Reset the points of a student to 0
router.post("/resetPoints", async (req, res) => {
  const request = req.body

  await getConnection()
    .createQueryBuilder()
    .update(Student)
    .set({ points: 0 })
    .where("email = :email", { email: request.email })
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
    .update(Student)
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
