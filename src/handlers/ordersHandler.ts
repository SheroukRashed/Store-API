import express, { Request, Response } from 'express'
import { OrderModel } from '../models/order'

const showByUser = async (req: Request, res: Response) => {
  const orders = await OrderModel.showByUser(req.params.id)
  res.json(orders)
}

const showByUserAndStatus = async (req: Request, res: Response) => {
  const orders = await OrderModel.showByUserAndStatus(req.params.user_id, req.params.status_id)
  res.json(orders)
}

const orderRoutes = (app: express.Application) => {
  app.get('/api/orders/users/:id', showByUser)
  app.get('/api/orders/users/:user_id/status/:status_id', showByUserAndStatus)
}

export default orderRoutes
