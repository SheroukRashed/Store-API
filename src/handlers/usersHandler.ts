import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserModel } from '../models/user'
import jwtAuth from '../middlewares/jwt'

const index = async (_req: Request, res: Response) : Promise<void> => {
  const users = await UserModel.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
  const user = await UserModel.show(req.params.id)
  res.json(user)
}

const create = async (req: Request, res: Response) : Promise<void> => {
  try {
    const user: User = {
      userName: req.params.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    }

    const newUser = await UserModel.create(user)
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string)
    res.json(token)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const authenticate = async (req: Request, res: Response) : Promise<void> => {
  const user: User = {
    userName: req.params.userName,
    password: req.body.password
  }
  try {
    const u = await UserModel.authenticate(user)
    const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string)
    res.json(token)
  } catch (error) {
    res.status(401)
    res.json({ error })
  }
}

const userRoutes = (app: express.Application) : void => {
  app.get('/api/users', jwtAuth, index)
  app.get('/api/users/:id', jwtAuth, show)
  app.post('/api/users', jwtAuth, create)
  app.post('/api/users/authenticate', authenticate)
}

export default userRoutes
