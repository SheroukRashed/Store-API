// @ts-ignore
import client from '../database'

export type Order = {
  id?: number
  userId: number
  statusId: number
}

export class OrderModel {
  static async index(): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  static async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  static async create(order: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO books (user_id, status_id) VALUES($1, $2) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [order.userId, order.statusId])

      const createdOrder = result.rows[0]

      conn.release()

      return createdOrder
    } catch (err) {
      throw new Error(`Could not add new order for user ${order.userId}. Error: ${err}`)
    }
  }

  static async showByUser(userId: string): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1)'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [userId])

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not find any orders for user ${userId}. Error: ${err}`)
    }
  }

  static async showByUserAndStatus(userId: string, statusId: string = '2'): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status_id=($2)'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [userId, statusId])

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(
        `Could not find any orders for user ${userId} with status ${statusId}. Error: ${err}`
      )
    }
  }
}
