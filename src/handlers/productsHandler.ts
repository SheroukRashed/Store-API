import express, { Request, Response } from 'express'
import jwtAuth from '../middlewares/jwt'
import { Product, ProductModel } from '../models/product'

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductModel.index()
    res.json(products)
  } catch (err) {
    throw new Error(`Could not get products. Error: ${err}`)
  }
}

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await ProductModel.show(req.params.id)
    res.json(product)
  } catch (err) {
    throw new Error(`Could not find product ${req.params.id}. Error: ${err}`)
  }
}

const showByCategory = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.showByCategory(req.params.id)
    res.json(product)
  } catch (err) {
    throw new Error(`Could not find any products in category ${req.params.id}. Error: ${err}`)
  }
}

const create = async (req: Request, res: Response): Promise<void> => {
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

const productRoutes = (app: express.Application): void => {
  app.get('/api/products', index)
  app.get('/api/products/:id', show)
  app.get('/api/products/category/:id', showByCategory)
  app.post('/api/products', jwtAuth, create)
}

export default productRoutes
