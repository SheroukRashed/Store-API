// @ts-ignore
import client from '../database'

export type Status = {
  name: string
}

export class StatusModel {

  static async create(status: Status): Promise<Status> {
    try {
      const sql = 'INSERT INTO statuses (name) VALUES($1) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [status.name])

      const createdStatus = await result.rows[0]

      conn.release()

      return createdStatus
    } catch (err) {
      throw new Error(`Could not add new status ${status.name}. Error: ${err}`)
    }
  }
}
