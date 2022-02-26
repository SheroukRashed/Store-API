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


const createOrder = async (user_id , status_id) => {
    const o = {
        user_id: user_id,
        status_id: status_id
    }
    const sql =
        'INSERT INTO orders (user_id, status_id) VALUES($1, $2) RETURNING *';
    const conn = await client.connect();

    const result = await conn.query(sql, [
        o.user_id,
        o.status_id
    ]);

    const order = result.rows[0];
    console.log(order)
    conn.release();
}



createOrder(1,1)
createOrder(1,1)
createOrder(1,2)
createOrder(1,2)

createOrder(2,1)
createOrder(2,1)
createOrder(2,2)
createOrder(2,2)

createOrder(3,1)
createOrder(3,1)
createOrder(3,2)
createOrder(3,2)
