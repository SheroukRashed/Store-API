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


const createOrderProduct = async (order_id,product_id,quantity) => {
    const op = {
        order_id: order_id,
        product_id: product_id,
        quantity: quantity
    }
    const sql =
        'INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
    const conn = await client.connect();

    const result = await conn.query(sql, [
        op.order_id,
        op.product_id,
        op.quantity
    ]);

    const orderProduct = result.rows[0];
    console.log(orderProduct)
    conn.release();
}



createOrderProduct(1,2,1)
createOrderProduct(2,3,2)
createOrderProduct(3,4,3)
createOrderProduct(4,5,4)

createOrderProduct(5,5,5)
createOrderProduct(6,5,1)
createOrderProduct(7,6,2)
createOrderProduct(8,7,3)

createOrderProduct(9,7,4)
createOrderProduct(10,7,5)
createOrderProduct(11,7,1)
createOrderProduct(12,10,2)

createOrderProduct(1,8,3)
createOrderProduct(2,8,4)
createOrderProduct(3,8,5)
createOrderProduct(4,5,1)

createOrderProduct(5,8,2)
createOrderProduct(6,9,3)
createOrderProduct(7,9,4)
createOrderProduct(8,9,5)

createOrderProduct(9,6,1)
createOrderProduct(10,6,2)
createOrderProduct(11,7,3)
createOrderProduct(12,10,4)
