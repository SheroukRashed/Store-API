import express, { Request, Response } from 'express'
import { User, UserModel } from '../models/user'

const index = async (_req: Request, res: Response) => {
  const users = await UserModel.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
  const user = await UserModel.show(req.params.id)
  res.json(user)
}

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    }

    const newUser = await UserModel.create(user)
    res.json(newUser)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const userRoutes = (app: express.Application) => {
  app.get('/api/users', index)
  app.get('/api/users/:id', show)
  app.post('/api/users', create)
}

export default userRoutes
