import express, { Request, Response } from 'express'
import { Product, ProductModel } from '../models/product'

const index = async (_req: Request, res: Response) => {
  const products = await ProductModel.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
  const product = await ProductModel.show(req.body.id)
  res.json(product)
}

const showByCategory = async (req: Request, res: Response) => {
    const product = await ProductModel.showByCategory(req.body.id)
    res.json(product)
  }

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      categoryId: req.body.categoryId
    }

    const newProduct = await ProductModel.create(product)
    res.json(newProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.get('/products/category/:id', showByCategory)
  app.post('/products', create)
}

export default productRoutes
