// @ts-ignore
import client from '../database'

export type OrderProduct = {
  id?: number
  orderId: number
  productId: number
  quantity: number
}

export class OrderProductModel {
  static async index(): Promise<OrderProduct[]> {
    try {
      const sql = 'SELECT * FROM orders_products'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get orders_products. Error: ${err}`)
    }
  }

  static async show(id: string): Promise<OrderProduct> {
    try {
      const sql = 'SELECT * FROM orders_products WHERE id=($1)'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find orders_products ${id}. Error: ${err}`)
    }
  }

  static async create(orderProduct: OrderProduct): Promise<OrderProduct> {
    try {
      const sql =
        'INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [
        orderProduct.orderId,
        orderProduct.productId,
        orderProduct.quantity
      ])

      const createdOrder = result.rows[0]

      conn.release()

      return createdOrder
    } catch (err) {
      throw new Error(
        `Could not add new order for order of id ${orderProduct.orderId}. Error: ${err}`
      )
    }
  }
}
