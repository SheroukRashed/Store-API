import { User, UserModel } from '../../models/user'

const user = new UserModel()

describe("User Model", () => {
  it('should have an index method', () => {
    expect(user.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(user.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await user.create({ 
        userName: 'jane',
        firstName: 'jane',
        lastName: 'mike'
    });
    expect(result).toEqual({
        userName: 'jane',
        firstName: 'jane',
        lastName: 'mike'
    });
  });

  it('index method should return a list of users', async () => {
    const result = await user.index();
    expect(result).toEqual([{
        userName: 'jane',
        firstName: 'jane',
        lastName: 'mike'
    }]);
  });

  it('show method should return the correct user', async () => {
    const result = await user.show("1");
    expect(result).toEqual({
        userName: 'jane',
        firstName: 'jane',
        lastName: 'mike'
    });
  });

});