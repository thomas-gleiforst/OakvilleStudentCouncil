import { Router, Request, Response } from 'express'
import { getConnection } from 'typeorm'

import { Student } from '../entity/Student'

const router = Router()

// FIXME: This might be a DB issue, but all of our strings for
// student are the same length, so when we run this query, there's
// a ton of whitespice in there. This might require a schema change
// or something else
router.get('/users', async (req: Request, res: Response) => {
  const users = await getConnection().getRepository(Student).find()
  return res.send({users})
})

router.get('/user/:id', (req, res) => {
  return res.send(`This is the example route with an id: ${req.params.id}`)
})

// TODO: Salt and hash user password
router.post('/user', async (req, res) => {
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

export default router
