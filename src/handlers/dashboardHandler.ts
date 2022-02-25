import express, { Request, Response } from 'express'
import DashboardQueries from '../models/dashboard'

const mostPopularProducts = async (_req: Request, res: Response) => {
  const products = await DashboardQueries.mostPopularProducts()
  res.json(products)
}

const dashboardRoutes = (app: express.Application) => {
  app.get('/api/products/five-most-popular', mostPopularProducts)
}

export default dashboardRoutes
