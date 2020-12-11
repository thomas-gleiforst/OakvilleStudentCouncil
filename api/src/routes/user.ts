import { Router, Request, Response } from 'express'
import { getConnection } from 'typeorm'

import { Student } from '../entity/Student'
import { Admin } from '../entity/Admin'
import { Attends } from '../entity/Attends'
import { request } from 'http'

const router = Router()

/**
 * Returns the students table with all attributes
 */
router.get('/allStudents', async (req: Request, res: Response) => {
  const users = await getConnection().getRepository(Student).find()
  return res.send({ users })
})

/**
 * Returns the admin table with all attributes
 */
router.get('/allAdmins', async (req: Request, res: Response) => {
  const admins = await getConnection().getRepository(Admin).find()
  return res.send({ admins })
})

/**
 * Returns a student object with all values
 * Requires these values in the request
 * email
 */
router.post('/student', async (req, res) => {
  const request = req.body

  const student = await getConnection()
    .createQueryBuilder()
    .select('student')
    .from(Student, 'student')
    .where('student.email = :email', { email: request.email })
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
router.post('/admin', async (req, res) => {
  const request = req.body

  const admin = await getConnection()
    .createQueryBuilder()
    .select('admin')
    .from(Admin, 'admin')
    .where('student.email = :email', { email: request.email })
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
router.post('/student/points', async (req: Request, res: Response) => {
  const request = req.body

  const points = await getConnection()
    .createQueryBuilder()
    .select('points')
    .from(Student, 'student')
    .where('student.email = :email', { email: request.email })
    .getRawOne()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send(points)
})

/**
 * Requires these values in the request
 * email
 */

// TODO: test
// Returns the event IDs for all the events that a user has attended
// See if we can just return all event attributes instead
router.post('/user/events', async (req: Request, res: Response) => {
  const request = req.body
  const eventIds = await getConnection()
    .createQueryBuilder()
    .select('eventID')
    .from(Attends, 'attends')
    .where('user.email IN (:...searchemail)', { searchemail: request.email })
    .getMany()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  return res.send('Point values returned.')
})

/**
 * Requires these values in the request
 * email
 * pointUpdate
 */

// TODO: test
// TODO implement
router.post('/updatePoints', async (req, res) => {
  const request = req.body

  let currentPoints = await getConnection()
    .createQueryBuilder()
    .select('points')
    .from(Student, 'student')
    .where('email = :email', { email: request.email })
    .getRawOne()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  await getConnection()
    .createQueryBuilder()
    .update(Student)
    .set({ points: currentPoints + request.pointUpdate })
    .where('email = :email', { email: request.email })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  // Successful return
  return res.send('Update request sent!')
})

/**
 * Requires these values in the request
 * email
 */

// TODO: test
// TODO implement
router.post('/resetPoints', async (req, res) => {
  const request = req.body

  await getConnection()
    .createQueryBuilder()
    .update(Student)
    .set({ points: 0 })
    .where('email = :email', { email: request.email })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  // Successful return
  return res.send('Update request sent!')
})

// TODO: test
// TODO implement
router.post('/resetAllPoints', async (req, res) => {
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
  return res.send('Update request sent!')
})

/**
 * Requires these values in the request
 * email
 * stuPass - password
 * firstName
 * middlename
 * lastName
 */
router.post('/newStudent', async (req, res) => {
  const request = req.body

  // TODO: Salt and hash user password
  const result = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Student)
    .values({
      email: request.email,
      stuPass: request.stuPass,
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

  // Successful return
  return res.send(result)
})

/**
 * Requires these values in the request
 * email
 * stuPass - password
 * firstName
 * middlename
 * lastName
 */

router.post('/newAdmin', async (req, res) => {
  const request = req.body

  // TODO: Salt and hash user passwordd
  const result = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Admin)
    .values({
      email: request.email,
      adminPass: request.adminPass,
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

  // Successful return
  return res.send(result)
})

router.post('/delStudent', async (req, res) => {
  const request = req.body

  const result = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Attends)
    .where('email = :email', { email: request.email })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Student)
    .where('email = :email', { email: request.email })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  // Successful return
  return res.send(result)
})

router.post('/delAdmin', async (req, res) => {
  const request = req.body

  const result = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Admin)
    .where('email = :email', { email: request.email })
    .execute()
    .catch((error) => {
      console.log(error)
      return res.send(error)
    })

  // Successful return
  return res.send(result)
})

export default router
