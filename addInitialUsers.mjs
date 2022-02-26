import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import pg from 'pg'

const Pool = pg.Pool
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

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

const createUser = async (user_name, first_name, last_name, password) => {
    const u = {
        user_name: user_name,
        first_name: first_name,
        last_name: last_name,
        password: password
    }
    const sql =
        'INSERT INTO users (user_name,first_name, last_name, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
    const conn = await client.connect();
    const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds)
    );

    const result = await conn.query(sql, [
        u.user_name,
        u.first_name,
        u.last_name,
        hash
    ]);

    const user = result.rows[0];
    console.log(user)
    conn.release();
}


createUser("shery", "sherouk", "rashed", "12345678")
createUser("ali", "ali", "rashed", "12345678")
createUser("omar", "omar", "rashed", "12345678")