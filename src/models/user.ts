// @ts-ignore
import bcrypt from 'bcrypt'
import client from '../database'

export type User = {
  id?: number
  userName: string
  firstName?: string
  lastName?: string
  password?: string
}

export class UserModel {
  static async index(): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql)

      conn.release()

      const returnedUsers = result.rows
      const returnedUserModels: User[] = []

      returnedUsers.forEach((user) => {
        const userModel: User = {
          id: user.id,
          userName: user.user_name,
          firstName: user.first_name,
          lastName: user.last_name
        }
        returnedUserModels.push(userModel)
      })
      return returnedUserModels
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

      const returnedUser = result.rows[0]

      conn.release()

      const returnedUserModel: User = {
        id: returnedUser.id,
        userName: returnedUser.user_name,
        firstName: returnedUser.first_name,
        lastName: returnedUser.last_name
      }
      return returnedUserModel
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

      const result = await conn.query(sql, [
        user.userName,
        user.firstName,
        user.lastName,
        passwordDigest
      ])

      const createdUser = result.rows[0]

      conn.release()

      const createdUserModel: User = {
        id: createdUser.id,
        userName: createdUser.user_name,
        firstName: createdUser.first_name,
        lastName: createdUser.last_name
      }
      return createdUserModel
    } catch (err) {
      throw new Error(`Could not add new user ${user.firstName} ${user.lastName} Error: ${err}`)
    }
  }

  static async authenticate(user: User): Promise<User | null> {
    const conn = await client.connect()
    const sql = 'SELECT * FROM users WHERE user_name=($1)'

    const result = await conn.query(sql, [user.userName])
    if (result.rows.length) {
      const returnedUser = result.rows[0]

      if (
        bcrypt.compareSync(
          (user.password as string) + process.env.BCRYPT_PASSWORD,
          returnedUser.password_digest
        )
      ) {
        const returnedUserModel: User = {
          id: returnedUser.id,
          userName: returnedUser.user_name,
          firstName: returnedUser.first_name,
          lastName: returnedUser.last_name
        }
        return returnedUserModel
      }
    }

    return null
  }
}
