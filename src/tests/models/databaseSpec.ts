import { UserModel } from '../../models/user'

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
})
