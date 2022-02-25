// @ts-ignore
import bcrypt from 'bcrypt'
import client from '../database'

export type User = {
  id?: number
  firstName: string
  lastName: string
  password: string
}

export class UserModel {
  static async index(): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  static async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  static async create(user: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (first_name, last_name, password_digest) VALUES($1, $2, $3) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()

      const passwordDigest = bcrypt.hashSync(`${user.password}your-secret-password`, 10)

      const result = await conn.query(sql, [user.firstName, user.lastName, passwordDigest])

      const createdUser = result.rows[0]

      conn.release()

      return createdUser
    } catch (err) {
      throw new Error(`Could not add new user ${user.firstName} ${user.lastName} Error: ${err}`)
    }
  }
}
