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


const createProduct = async (name, price, category_id) => {
    const p = {
        name: name,
        price: price,
        category_id: category_id
    }
    const sql =
        'INSERT INTO products (name, price, category_id) VALUES($1, $2, $3) RETURNING *';
    const conn = await client.connect();

    const result = await conn.query(sql, [
        p.name,
        p.price,
        p.category_id
    ]);

    const product = result.rows[0];
    console.log(product)
    conn.release();
}


createProduct('product_1',10,1)
createProduct('product_2',8,1)
createProduct('product_3',7,2)
createProduct('product_4',12,2)
createProduct('product_5',10,2)
createProduct('product_6',6,3)
createProduct('product_7',4,3)
createProduct('product_8',5,4)
createProduct('product_9',8,5)
createProduct('product_10',12,5)
