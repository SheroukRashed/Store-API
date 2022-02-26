// @ts-ignore
import bcrypt from 'bcrypt'
import client from '../database'

export type User = {
  id?: number
  userName: string
  firstName?: string
  lastName?: string
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
        'INSERT INTO users (user_name, first_name, last_name, password_digest) VALUES($1, $2, $3, $4) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()

      const passwordDigest = bcrypt.hashSync(
        `${user.password}${process.env.BCRYPT_PASSWORD}`,
        parseInt(process.env.SALT_ROUND as string, 2)
      )

      const result = await conn.query(sql, [user.userName, user.firstName, user.lastName, passwordDigest])

      const createdUser = result.rows[0]

      conn.release()

      return createdUser
    } catch (err) {
      throw new Error(`Could not add new user ${user.firstName} ${user.lastName} Error: ${err}`)
    }
  }

  static async authenticate(user: User): Promise<User | null> {
    const conn = await client.connect()
    const sql = 'SELECT password_digest FROM users WHERE first_name=($1)'

    const result = await conn.query(sql, [user.firstName])

    if (result.rows.length) {
      const returnedUser = result.rows[0]

      if (
        bcrypt.compareSync(user.password + process.env.BCRYPT_PASSWORD, returnedUser.passwordDigest)
      ) {
        return returnedUser
      }
    }

    return null
  }
}
