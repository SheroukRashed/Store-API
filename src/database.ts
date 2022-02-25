import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env
const { POSTGRES_HOST_TEST, POSTGRES_DB_TEST, POSTGRES_USER_TEST, POSTGRES_PASSWORD_TEST } =
  process.env

const client = new Pool({
  host: process.env.ENV === 'test' ? POSTGRES_HOST_TEST : POSTGRES_HOST,
  database: process.env.ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB,
  user: process.env.ENV === 'test' ? POSTGRES_USER_TEST : POSTGRES_USER,
  password: process.env.ENV === 'test' ? POSTGRES_PASSWORD_TEST : POSTGRES_PASSWORD
})

export default client
