import express, { Request, Response } from 'express'
import jwtAuth from '../middlewares/jwt'
import { OrderModel } from '../models/order'

const showByUser = async (req: Request, res: Response) : Promise<void> => {
  const orders = await OrderModel.showByUser(req.params.id)
  res.json(orders)
}

const showByUserAndStatus = async (req: Request, res: Response) : Promise<void> => {
  const orders = await OrderModel.showByUserAndStatus(req.params.user_id, req.params.status_id)
  res.json(orders)
}

const orderRoutes = (app: express.Application) : void => {
  app.get('/api/orders/user/:id', jwtAuth, showByUser)
  app.get('/api/orders/user/:user_id/status/:status_id', jwtAuth, showByUserAndStatus)
}

export default orderRoutes
