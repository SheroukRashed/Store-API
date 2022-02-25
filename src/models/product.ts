// @ts-ignore
import client from '../database'

export type Product = {
  id?: number
  name: string
  price: number
  categoryId: number
}

export class ProductModel {
  static async index(): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  static async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  static async create(product: Product): Promise<Product> {
    try {
      const sql = 'INSERT INTO products (name, price, category_id) VALUES($1, $2, $3) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [product.name, product.price, product.categoryId])

      const createdProduct = result.rows[0]

      conn.release()

      return createdProduct
    } catch (err) {
      throw new Error(`Could not add new product ${product.name}. Error: ${err}`)
    }
  }

  static async showByCategory(categoryId: string): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products WHERE category_id=($1)'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [categoryId])

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not find any products in category ${categoryId}. Error: ${err}`)
    }
  }
}
