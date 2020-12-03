import { Router, Request, Response } from 'express'
import { getConnection } from 'typeorm'

import { Student } from '../entity/Student';

const router = Router()

router.get('/user', async (req: Request, res: Response) => {
  const users = getConnection().getRepository(Student).find()
  return res.send('Getting list of all users ${users}')
})

router.get('/user/:id', (req, res) => {
  return res.send(`This is the example route with an id: ${req.params.id}`)
})

export default router
