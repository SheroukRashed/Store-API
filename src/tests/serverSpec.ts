import supertest from 'supertest'
import jwtDecode from 'jwt-decode'
import app from '../server'
import { User, UserModel } from '../models/user'
import { Product, ProductModel } from '../models/product'
import { OrderModel } from '../models/order'
import { CategoryModel } from '../models/category'
import { OrderProductModel } from '../models/orderProduct'

const request = supertest(app)

type DecodedJWT = {
  user: User
}

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}
let token: string

const newUser: User = {
  userName: 'ahmed',
  firstName: 'ahmed',
  lastName: 'rashed',
  password: '12345678'
}
const createdUser: User = { id: 2, ...newUser }

const currentUser: User = {
  userName: 'shery',
  firstName: 'sherouk',
  lastName: 'rashed',
  password: '12345678'
}

const product1: Product = {
  id: 1,
  name: 'product1',
  price: 1,
  categoryId: 1
}

const product2: Product = {
  id: 2,
  name: 'product2',
  price: 1,
  categoryId: 2
}

const product3: Product = {
  id: 3,
  name: 'product3',
  price: 1,
  categoryId: 3
}

describe('Access Denied tests', () => {
  it('user sould reveive 401 trying to create user with no token', async () => {
    const response = await request.post('/api/users')
    expect(response.status).toBe(401)
  })
  it('user sould reveive 401 trying to show user with no token', async () => {
    const response = await request.get('/api/users/1')
    expect(response.status).toBe(401)
  })
  it('user sould reveive 401 trying to show all users with no token', async () => {
    const response = await request.get('/api/users')
    expect(response.status).toBe(401)
  })
  it('user sould reveive 401 trying to show order by user with no token', async () => {
    const response = await request.get('/api/orders/user/1')
    expect(response.status).toBe(401)
  })
  it('user sould reveive 401 trying to show completed order by user  with no token', async () => {
    const response = await request.get('/api/orders/user/1/status/2')
    expect(response.status).toBe(401)
  })
  it('user sould reveive 401 trying to create product with no token', async () => {
    const response = await request.post('/api/products')
    expect(response.status).toBe(401)
  })
})

describe('Users Route tests', () => {
  beforeAll(async () => {
    await UserModel.create(currentUser)
  })

  it('authenticate the current user', async () => {
    const response = await request
      .post('/api/users/authenticate')
      .set(jsonHeaders)
      .send(currentUser)
    expect(response.status).toBe(200)
    token = `Bearer ${response.body}`
    const decodedUser: User = (jwtDecode(response.body) as DecodedJWT).user

    expect(decodedUser.firstName).toEqual(currentUser.firstName)
    expect(decodedUser.lastName).toEqual(currentUser.lastName)
    expect(decodedUser.id).toEqual(1)
    expect(decodedUser.userName).toEqual(currentUser.userName)
    expect(decodedUser.password).toBeUndefined()
  })

  it('user can create a new user (Signup)', async () => {
    const response = await request
      .post('/api/users')
      .set({ ...jsonHeaders, Authorization: token })
      .send(newUser)
    expect(response.status).toBe(200)
    const decodedUser: User = (jwtDecode(response.body) as DecodedJWT).user
    expect(decodedUser.firstName).toEqual(createdUser.firstName)
    expect(decodedUser.lastName).toEqual(createdUser.lastName)
    expect(decodedUser.id).toEqual(createdUser.id)
    expect(decodedUser.userName).toEqual(createdUser.userName)
    expect(decodedUser.password).toBeUndefined()
  })

  it('user can show a user', async () => {
    const response = await request.get('/api/users/2').set({ ...jsonHeaders, Authorization: token })
    expect(response.status).toBe(200)
    expect(response.body.firstName).toEqual(createdUser.firstName)
    expect(response.body.lastName).toEqual(createdUser.lastName)
    expect(response.body.id).toEqual(createdUser.id)
    expect(response.body.userName).toEqual(createdUser.userName)
    expect(response.body.password).toBeUndefined()
  })

  it('user can show all users', async () => {
    const response = await request.get('/api/users').set({ ...jsonHeaders, Authorization: token })
    expect(response.status).toBe(200)
    expect(response.body[0].firstName).toEqual(currentUser.firstName)
    expect(response.body[0].lastName).toEqual(currentUser.lastName)
    expect(response.body[0].id).toEqual(1)
    expect(response.body[0].userName).toEqual(currentUser.userName)
    expect(response.body[0].password).toBeUndefined()

    expect(response.body[1].firstName).toEqual(createdUser.firstName)
    expect(response.body[1].lastName).toEqual(createdUser.lastName)
    expect(response.body[1].id).toEqual(createdUser.id)
    expect(response.body[1].userName).toEqual(createdUser.userName)
    expect(response.body[1].password).toBeUndefined()
  })
})

describe('Products Route tests', () => {
  beforeAll(async () => {
    await CategoryModel.create({ name: 'category_1' })
    await CategoryModel.create({ name: 'category_2' })
    await CategoryModel.create({ name: 'category_3' })
  })

  it('user can create a product', async () => {
    const response = await request
      .post('/api/products')
      .set({ ...jsonHeaders, Authorization: token })
      .send(product1)
    expect(response.status).toBe(200)
    expect(response.body.id).toEqual(product1.id)
    expect(response.body.name).toEqual(product1.name)
    expect(parseInt(response.body.price, 2)).toEqual(product1.price)
    expect(response.body.category_id).toEqual(product1.categoryId)

    const response2 = await request
      .post('/api/products')
      .set({ ...jsonHeaders, Authorization: token })
      .send(product2)
    expect(response2.status).toBe(200)
    expect(response2.body.id).toEqual(product2.id)
    expect(response2.body.name).toEqual(product2.name)
    expect(parseInt(response2.body.price, 2)).toEqual(product2.price)
    expect(response2.body.category_id).toEqual(product2.categoryId)

    const response3 = await request
      .post('/api/products')
      .set({ ...jsonHeaders, Authorization: token })
      .send(product3)
    expect(response3.status).toBe(200)
    expect(response3.body.id).toEqual(product3.id)
    expect(response3.body.name).toEqual(product3.name)
    expect(parseInt(response3.body.price, 2)).toEqual(product3.price)
    expect(response3.body.category_id).toEqual(product3.categoryId)
  })

  it('user can show a product', async () => {
    const response = await request.get('/api/products/1')
    expect(response.status).toBe(200)
    expect(response.body.id).toEqual(product1.id)
    expect(response.body.name).toEqual(product1.name)
    expect(parseInt(response.body.price, 2)).toEqual(product1.price)
    expect(response.body.category_id).toEqual(product1.categoryId)
  })

  it('user can show all product', async () => {
    const response = await request.get('/api/products')
    expect(response.status).toBe(200)
    expect(response.body[0].id).toEqual(product1.id)
    expect(response.body[0].name).toEqual(product1.name)
    expect(parseInt(response.body[0].price, 2)).toEqual(product1.price)
    expect(response.body[0].category_id).toEqual(product1.categoryId)

    expect(response.body[1].id).toEqual(product2.id)
    expect(response.body[1].name).toEqual(product2.name)
    expect(parseInt(response.body[1].price, 2)).toEqual(product2.price)
    expect(response.body[1].category_id).toEqual(product2.categoryId)

    expect(response.body[2].id).toEqual(product3.id)
    expect(response.body[2].name).toEqual(product3.name)
    expect(parseInt(response.body[2].price, 2)).toEqual(product3.price)
    expect(response.body[2].category_id).toEqual(product3.categoryId)
  })

  it('user can show all product od specific category', async () => {
    const response = await request.get('/api/products/category/3')
    expect(response.status).toBe(200)
    expect(response.body[0].id).toEqual(product3.id)
    expect(response.body[0].name).toEqual(product3.name)
    expect(parseInt(response.body[0].price, 2)).toEqual(product3.price)
    expect(response.body[0].category_id).toEqual(product3.categoryId)
  })
})

describe('Orders Route tests', () => {
  beforeAll(async () => {
    await OrderModel.create({ userId: 1, statusId: 1 })
    await OrderModel.create({ userId: 2, statusId: 1 })
    await OrderModel.create({ userId: 1, statusId: 2 })
    await OrderModel.create({ userId: 2, statusId: 2 })
  })

  it('user can show orders by user', async () => {
    const response = await request
      .get('/api/orders/user/1')
      .set({ ...jsonHeaders, Authorization: token })
    expect(response.status).toBe(200)
    expect(response.body[0].user_id).toEqual(1)
    expect(response.body[1].user_id).toEqual(1)

    const response2 = await request
      .get('/api/orders/user/2')
      .set({ ...jsonHeaders, Authorization: token })
    expect(response2.status).toBe(200)
    expect(response2.body[0].user_id).toEqual(createdUser.id)
    expect(response2.body[1].user_id).toEqual(createdUser.id)
  })

  it('user can show completed orders by user', async () => {
    const response = await request
      .get('/api/orders/user/1/status/2')
      .set({ ...jsonHeaders, Authorization: token })
    expect(response.status).toBe(200)
    expect(response.body[0].user_id).toEqual(1)
    expect(response.body[0].status_id).toEqual(2)

    const response2 = await request
      .get('/api/orders/user/2/status/2')
      .set({ ...jsonHeaders, Authorization: token })
    expect(response2.status).toBe(200)
    expect(response2.body[0].user_id).toEqual(createdUser.id)
    expect(response2.body[0].status_id).toEqual(2)
  })
})

describe('Dashboard Route tests', () => {
  beforeAll(async () => {
    await ProductModel.create({ id: 4, name: 'product4', price: 4, categoryId: 1 })
    await ProductModel.create({ id: 5, name: 'product5', price: 5, categoryId: 2 })
    await ProductModel.create({ id: 6, name: 'product6', price: 6, categoryId: 3 })

    await OrderModel.create({ userId: 1, statusId: 1 })
    await OrderModel.create({ userId: 2, statusId: 1 })

    await OrderProductModel.create({ productId: 1, orderId: 1, quantity: 1 })
    // /// ////////////////////////////////////////////////////////////////////
    await OrderProductModel.create({ productId: 2, orderId: 1, quantity: 1 })
    await OrderProductModel.create({ productId: 2, orderId: 2, quantity: 1 })
    // /// ////////////////////////////////////////////////////////////////////
    await OrderProductModel.create({ productId: 3, orderId: 1, quantity: 1 })
    await OrderProductModel.create({ productId: 3, orderId: 2, quantity: 1 })
    await OrderProductModel.create({ productId: 3, orderId: 3, quantity: 1 })
    // /// ////////////////////////////////////////////////////////////////////
    await OrderProductModel.create({ productId: 4, orderId: 1, quantity: 1 })
    await OrderProductModel.create({ productId: 4, orderId: 2, quantity: 1 })
    await OrderProductModel.create({ productId: 4, orderId: 3, quantity: 1 })
    await OrderProductModel.create({ productId: 4, orderId: 4, quantity: 1 })
    // /// ////////////////////////////////////////////////////////////////////
    await OrderProductModel.create({ productId: 5, orderId: 1, quantity: 1 })
    await OrderProductModel.create({ productId: 5, orderId: 2, quantity: 1 })
    await OrderProductModel.create({ productId: 5, orderId: 3, quantity: 1 })
    await OrderProductModel.create({ productId: 5, orderId: 4, quantity: 1 })
    await OrderProductModel.create({ productId: 5, orderId: 5, quantity: 1 })
    // /// ////////////////////////////////////////////////////////////////////
    await OrderProductModel.create({ productId: 6, orderId: 1, quantity: 1 })
    await OrderProductModel.create({ productId: 6, orderId: 2, quantity: 1 })
    await OrderProductModel.create({ productId: 6, orderId: 3, quantity: 1 })
    await OrderProductModel.create({ productId: 6, orderId: 4, quantity: 1 })
    await OrderProductModel.create({ productId: 6, orderId: 5, quantity: 1 })
    await OrderProductModel.create({ productId: 6, orderId: 6, quantity: 1 })
  })

  it('user can show 5 most popular products', async () => {
    const response = await request.get('/api/products/five-most-popular')
    expect(response.status).toBe(200)
    expect(response.body[0].id).toEqual(2)
    expect(response.body[1].id).toEqual(3)
    expect(response.body[2].id).toEqual(4)
    expect(response.body[3].id).toEqual(5)
    expect(response.body[4].id).toEqual(6)
  })
})
