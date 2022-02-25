// @ts-ignore
import client from '../database'
import { Product } from './product'

export default class DashboardQueries {
  // Get all products that have been included in orders
  static async mostPopularProducts(limit: string = '5'): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql =
        'SELECT * FROM products WHERE id IN' +
        '(SELECT product_id FROM orders_products GROUP BY product_id ORDER BY COUNT(product_id) DESC LIMIT ($1))'

      const result = await conn.query(sql, [limit])

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get most popular products : ${err}`)
    }
  }
}
