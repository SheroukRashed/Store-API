import express, { Request, Response } from 'express'
import { Product, ProductModel } from '../models/product'

const index = async (_req: Request, res: Response) => {
  const products = await ProductModel.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
  const product = await ProductModel.show(req.params.id)
  res.json(product)
}

const showByCategory = async (req: Request, res: Response) => {
  const product = await ProductModel.showByCategory(req.params.id)
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
  app.get('/api/products', index)
  app.get('/api/products/:id', show)
  app.get('/api/products/category/:id', showByCategory)
  app.post('/api/products', create)
}

export default productRoutes
