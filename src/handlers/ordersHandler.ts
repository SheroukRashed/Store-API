import express, { Request, Response } from 'express'
import jwtAuth from '../middlewares/jwt'
import { OrderModel } from '../models/order'

const showByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await OrderModel.showByUser(req.params.id)
    res.json(orders)
  } catch (err) {
    throw new Error(`Could not find any orders for user ${req.params.id}. Error: ${err}`)
  }
}

const showByUserAndStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await OrderModel.showByUserAndStatus(req.params.user_id, req.params.status_id)
    res.json(orders)
  } catch (err) {
    throw new Error(
      `Could not find any orders for user ${req.params.user_id} with status ${req.params.status_id}. Error: ${err}`
    )
  }
}

const orderRoutes = (app: express.Application): void => {
  app.get('/api/orders/user/:id', jwtAuth, showByUser)
  app.get('/api/orders/user/:user_id/status/:status_id', jwtAuth, showByUserAndStatus)
}

export default orderRoutes
