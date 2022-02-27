// @ts-ignore
import client from '../database'

export type Category = {
  name: string
}

export class CategoryModel {
  static async create(category: Category): Promise<Category> {
    try {
      const sql = 'INSERT INTO categories (name) VALUES($1) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [category.name])

      const createdCategory = result.rows[0]

      conn.release()

      return createdCategory
    } catch (err) {
      throw new Error(`Could not add new category ${category.name}. Error: ${err}`)
    }
  }
}
