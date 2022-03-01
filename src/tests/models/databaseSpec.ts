import { UserModel } from '../../models/user'
import { ProductModel } from '../../models/product'
import { CategoryModel } from '../../models/category'
import { StatusModel } from '../../models/status'
import { OrderModel } from '../../models/order'
import { OrderProductModel } from '../../models/orderProduct'
import DashboardQueries from '../../models/dashboard'

describe('User Model', () => {
  it('should have an index method', () => {
    expect(UserModel.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(UserModel.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(UserModel.create).toBeDefined()
  })

  it('should have a authenticate method', () => {
    expect(UserModel.authenticate).toBeDefined()
  })

  it('create method should add a user', async () => {
    const result = await UserModel.create({
      userName: 'jane',
      firstName: 'jane',
      lastName: 'mike'
    })
    expect(result).toEqual(
      jasmine.objectContaining({
        userName: 'jane',
        firstName: 'jane',
        lastName: 'mike'
      })
    )
  })

  it('index method should return a list of users', async () => {
    const result = await UserModel.index()
    expect(result).toEqual([
      jasmine.objectContaining({
        userName: 'jane',
        firstName: 'jane',
        lastName: 'mike'
      })
    ])
  })

  it('show method should return the correct user', async () => {
    const result = await UserModel.show('1')
    expect(result).toEqual(
      jasmine.objectContaining({
        userName: 'jane',
        firstName: 'jane',
        lastName: 'mike'
      })
    )
  })

  it('authenticate method should return user', async () => {
    const result = await UserModel.authenticate({
      userName: 'jane',
      firstName: 'jane',
      lastName: 'mike'
    })
    expect(result).toEqual(
      jasmine.objectContaining({
        userName: 'jane',
        firstName: 'jane',
        lastName: 'mike'
      })
    )
  })
})

describe('Category Model', () => {
  it('should have a create method', () => {
    expect(CategoryModel.create).toBeDefined()
  })

  it('create method should add a category', async () => {
    const result = await CategoryModel.create({
      name: 'Cat_1'
    })
    expect(result).toEqual(
      jasmine.objectContaining({
        name: 'Cat_1'
      })
    )
  })
})

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(ProductModel.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(ProductModel.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(ProductModel.create).toBeDefined()
  })

  it('should have a show by category method', () => {
    expect(ProductModel.showByCategory).toBeDefined()
  })

  it('create method should add a product', async () => {
    const result = await ProductModel.create({
      name: 'product_1',
      price: 1,
      categoryId: 1
    })
    expect(result).toEqual(
      jasmine.objectContaining({
        name: 'product_1',
        price: '1.00',
        category_id: 1
      })
    )
  })

  it('index method should return a list of products', async () => {
    const result = await ProductModel.index()
    expect(result).toEqual([
      jasmine.objectContaining({
        name: 'product_1',
        price: '1.00',
        category_id: 1
      })
    ])
  })

  it('show method should return the correct product', async () => {
    const result = await ProductModel.show('1')
    expect(result).toEqual(
      jasmine.objectContaining({
        name: 'product_1',
        price: '1.00',
        category_id: 1
      })
    )
  })

  it('show method should return the correct products by category', async () => {
    const result = await ProductModel.showByCategory('1')
    expect(result).toEqual([
      jasmine.objectContaining({
        name: 'product_1',
        price: '1.00',
        category_id: 1
      })
    ])
  })
})

describe('Status Model', () => {
  it('should have a create method', () => {
    expect(StatusModel.create).toBeDefined()
  })

  it('create method should add a status', async () => {
    const result = await StatusModel.create({
      name: 'status_1'
    })
    expect(result).toEqual(
      jasmine.objectContaining({
        name: 'status_1'
      })
    )
  })
})

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(OrderModel.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(OrderModel.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(OrderModel.create).toBeDefined()
  })

  it('should have a show by user method', () => {
    expect(OrderModel.showByUser).toBeDefined()
  })

  it('should have a show by user and status method', () => {
    expect(OrderModel.showByUserAndStatus).toBeDefined()
  })

  it('create method should add a user', async () => {
    const result = await OrderModel.create({
      userId: 1,
      statusId: 2
    })
    expect(result).toEqual(
      jasmine.objectContaining({
        user_id: 1,
        status_id: 2
      })
    )
  })

  it('index method should return a list of orders', async () => {
    const result = await OrderModel.index()
    expect(result).toEqual([
      jasmine.objectContaining({
        user_id: 1,
        status_id: 2
      })
    ])
  })

  it('show method should return the correct order', async () => {
    const result = await OrderModel.show('1')
    expect(result).toEqual(
      jasmine.objectContaining({
        user_id: 1,
        status_id: 2
      })
    )
  })

  it('show method should return the correct order by user', async () => {
    const result = await OrderModel.showByUser('1')
    expect(result).toEqual([
      jasmine.objectContaining({
        user_id: 1,
        status_id: 2
      })
    ])
  })
})

describe('Order Product Model', () => {
  it('should have an index method', () => {
    expect(OrderProductModel.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(OrderProductModel.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(OrderProductModel.create).toBeDefined()
  })

  it('create method should add a new order with products', async () => {
    const result = await OrderProductModel.create({
      orderId: 1,
      productId: 1,
      quantity: 1
    })
    expect(result).toEqual(
      jasmine.objectContaining({
        order_id: 1,
        product_id: 1,
        quantity: 1
      })
    )
  })

  it('index method should return a list of orders with products', async () => {
    const result = await OrderProductModel.index()
    expect(result).toEqual([
      jasmine.objectContaining({
        order_id: 1,
        product_id: 1,
        quantity: 1
      })
    ])
  })

  it('show method should return the correct order with products', async () => {
    const result = await OrderProductModel.show('1')
    expect(result).toEqual(
      jasmine.objectContaining({
        order_id: 1,
        product_id: 1,
        quantity: 1
      })
    )
  })
})

describe('Dashboard Queries', () => {
  beforeAll(async () => {
    await ProductModel.create({ id: 2, name: 'product2', price: 2, categoryId: 1 })
    await ProductModel.create({ id: 3, name: 'product3', price: 3, categoryId: 1 })
    await ProductModel.create({ id: 4, name: 'product4', price: 4, categoryId: 1 })
    await ProductModel.create({ id: 5, name: 'product5', price: 5, categoryId: 1 })
    await ProductModel.create({ id: 6, name: 'product6', price: 6, categoryId: 1 })

    await OrderModel.create({ userId: 1, statusId: 2 })
    await OrderModel.create({ userId: 1, statusId: 1 })
    await OrderModel.create({ userId: 1, statusId: 2 })
    await OrderModel.create({ userId: 1, statusId: 1 })
    await OrderModel.create({ userId: 1, statusId: 2 })

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

  it('should have an index method', () => {
    expect(DashboardQueries.mostPopularProducts).toBeDefined()
  })

  it('mostPopularProducts method should return the 5 most popular products', async () => {
    const result = await DashboardQueries.mostPopularProducts()
    expect(result).toEqual([
      jasmine.objectContaining({
        id: 2,
        name: 'product2',
        price: '2.00',
        category_id: 1
      }),
      jasmine.objectContaining({
        id: 3,
        name: 'product3',
        price: '3.00',
        category_id: 1
      }),
      jasmine.objectContaining({
        id: 4,
        name: 'product4',
        price: '4.00',
        category_id: 1
      }),
      jasmine.objectContaining({
        id: 5,
        name: 'product5',
        price: '5.00',
        category_id: 1
      }),
      jasmine.objectContaining({
        id: 6,
        name: 'product6',
        price: '6.00',
        category_id: 1
      })
    ])
  })
})
