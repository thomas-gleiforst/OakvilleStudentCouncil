import { Router, Request, Response } from 'express'
import { getConnection } from 'typeorm'

import { Student } from '../entity/Student'
import { Admin } from '../entity/Admin'
import { Attends } from '../entity/Attends'
import { request } from 'http'

const router = Router()

// FIXME: This might be a DB issue, but all of our strings for
// student are the same length, so when we run this query, there's
// a ton of whitespice in there. This might require a schema change
// or something else
//QUESTION: Is this the query that returns all student stats
router.get('/users', async (req: Request, res: Response) => {
  const users = await getConnection().getRepository(Student).find()
  return res.send({users})
})

router.get('/user/:id', (req, res) => {
  return res.send(`This is the example route with an id: ${req.params.id}`)
})

//TODO: How to get user input for searchemail?
//TODO: How to return the given results
router.get('/user/:points', async(req: Request, res: Response) => {
  const request = req.body
  const points = await getConnection()
  .createQueryBuilder()
  //.values({
  //  searchemail: request.searchemail,
  //})
  .select("points")
  .from(Student, "student")
  .where("user.email IN (:...searchemail)", {searchemail: "bdefm5@mst.edu"})
  .getMany()
  .catch((error: "EntityNotFoundError") => {
    return res.send("Email does not exist.")
  })
  .catch((error) => {
    console.log(error)
    return res.send(error)
  });

  return res.send('Point values returned.')
})

//TODO: How to get user input for searchemail?
//TODO: Convert returned results from eventIDs to event names or some other parameter
router.get('/user/:events', async(req: Request, res: Response) => {
  const request = req.body
  const points = await getConnection()
  .createQueryBuilder()
  .select("eventID")
  .from(Attends, "attends")
  .where("user.email IN (:...searchemail)", {searchemail: "bdefm5@mst.edu"})
  .getMany()
  .catch((error: "EntityNotFoundError") => {
    return res.send("Email does not exist.")
  })
  .catch((error) => {
    console.log(error)
    return res.send(error)
  });

  return res.send('Point values returned.')
})


//TODO: How to pass in user points to update
//TODO: How to pass in user email
router.post('/updatePoints', async (req, res) => {
  const request = req.body

  await getConnection()
    .createQueryBuilder()
    .update(Student)
    .set({points: 10})
    .where("email = :email", {email: "bdefm5@mst.edu"})
    .execute()
    .catch((error) => {
      // If there is an error
      console.log(error)
      return res.send(error)
    })

  // Successful return
  return res.send('Update request sent!')
})

// TODO: Salt and hash user password
router.post('/stuUser', async (req, res) => {
  const request = req.body

  await getConnection()
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
  return res.send('Post request sent!')
})

// TODO: Salt and hash user password
router.post('/adminUser', async (req, res) => {
  const request = req.body

  await getConnection()
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
      // If there is an error
      console.log(error)
      return res.send(error)
    })

  // Successful return
  return res.send('Post request sent!')
})

export default router
