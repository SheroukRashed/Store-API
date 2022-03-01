import { UserModel } from '../../models/user'
import { ProductModel } from '../../models/product'
import { CategoryModel } from '../../models/category'
import { StatusModel } from '../../models/status'

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
  beforeAll(async () => {
    await CategoryModel.create({ name: 'category_1' })
  })

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