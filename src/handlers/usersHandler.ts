import express, { Request, Response } from 'express'
import { User, UserModel } from '../models/user'

const index = async (_req: Request, res: Response) => {
  const users = await UserModel.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
  const user = await UserModel.show(req.body.id)
  res.json(user)
}

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      passwordDigest: req.body.passwordDigest
    }

    const newUser = await UserModel.create(user)
    res.json(newUser)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
}

export default userRoutes
