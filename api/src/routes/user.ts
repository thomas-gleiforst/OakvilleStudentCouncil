import { Router, Request, Response } from "express"
import { getConnection, getRepository, getManager } from "typeorm"

import { Student } from "../entity/Student"
import { Admin } from "../entity/Admin"
import { Attends } from "../entity/Attends"
import { request } from "http"

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
 * Returns a student object with all values
 * Requires these values in the request
 * email
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
 * Returns a admin object with all values
 * Requires these values in the request
 * email
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
  res.send(points)
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

/*
 * password - Student password
 */
router.post("/loginStudent", async (req, res) => {
  const request = req.body

  const student =
    (await getConnection()
      .createQueryBuilder()
      .select("student")
      .from(Student, "student")
      .where("student.email = :email AND student.stuPass = :password", {
        email: request.email,
        password: request.password,
      })
      .getOne()) || null

  if (student) {
    return res.send(student)
  } else {
    return res.status(401).send("Wrong email or password. Please try again.")
  }
})

/**
 * Login the student to get student details
 * POST Request
 * email - Email of student
 * password - Student password
 */
router.post("/loginAdmin", async (req, res) => {
  const request = req.body

  const admin =
    (await getConnection()
      .createQueryBuilder()
      .select("admin")
      .from(Admin, "admin")
      .where("admin.email = :email AND admin.adminPass = :password", {
        email: request.email,
        password: request.password,
      })
      .getOne()) || null

  if (admin) {
    return res.send(admin)
  } else {
    return res.status(401).send("Wrong email or password. Please try again.")
  }
})

export default router
