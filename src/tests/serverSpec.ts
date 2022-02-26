import jasmine from 'jasmine';
import supertest from 'supertest';
import app from '../server';
import { User, UserModel } from '../models/user';
import { Product, ProductModel } from '../models/product';
import { Order, OrderModel } from '../models/order';
import jwt_decode from 'jwt-decode';

const request = supertest(app);

type DecodedJWT = {
  user: User;
};

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};
let token: string;

const newUser: User = {
  userName: 'ahmed',
  firstName: 'ahmed',
  lastName: 'rashed',
  password: '12345678'
};
const createdUser: User = { id: 2 , ...newUser };

const currentUser: User = {
  userName: 'shery',
  firstName: 'sherouk',
  lastName: 'rashed',
  password: '12345678'
};

describe('Access Denied tests', () => {
    it('user sould reveive 401 trying to create user with no token', async () => {
      const response = await request.post('/api/users');
      expect(response.status).toBe(401);
    });
    it('user sould reveive 401 trying to show user with no token', async () => {
      const response = await request.get('/api/users/1');
      expect(response.status).toBe(401);
    });
    it('user sould reveive 401 trying to show all users with no token', async () => {
      const response = await request.get('/api/users');
      expect(response.status).toBe(401);
    });
    it('user sould reveive 401 trying to show order by user with no token', async () => {
      const response = await request.get('/api/orders/user/1');
      expect(response.status).toBe(401);
    });
    it('user sould reveive 401 trying to show completed order by user  with no token', async () => {
      const response = await request.get('/api/orders/user/1/status/2');
      expect(response.status).toBe(401);
    });
    it('user sould reveive 401 trying to create product with no token', async () => {
      const response = await request.post('/api/products');
      expect(response.status).toBe(401);
    });
});

describe('Users Route tests', () => {

  beforeAll(async () => {
    await UserModel.create(currentUser);
  });

  it('authenticate the current user', async () => {
    const response = await request.post('/api/users/authenticate').set(jsonHeaders).send(currentUser);
      expect(response.status).toBe(200);
      token = 'Bearer ' + response.body;
      const decodedUser: User = (jwt_decode(response.body) as DecodedJWT).user;

      expect(decodedUser.firstName).toEqual(currentUser.firstName);
      expect(decodedUser.lastName).toEqual(currentUser.lastName);
      expect(decodedUser.id).toEqual(1);
      expect(decodedUser.userName).toEqual(currentUser.userName);
      expect(decodedUser.password).toBeUndefined();
  });

  it('current user can create a user', async () => {
    const response = await request.post('/api/users').set({ ...jsonHeaders, Authorization: token }).send(newUser);
    expect(response.status).toBe(200);
    const decodedUser: User = (jwt_decode(response.body) as DecodedJWT).user;
    expect(decodedUser.firstName).toEqual(createdUser.firstName);
    expect(decodedUser.lastName).toEqual(createdUser.lastName);
    expect(decodedUser.id).toEqual(createdUser.id);
    expect(decodedUser.userName).toEqual(createdUser.userName);
    expect(decodedUser.password).toBeUndefined();
  });

  it('current user can show a user', async () => {
    const response = await request.get('/api/users/2').set({ ...jsonHeaders, Authorization: token });
    expect(response.status).toBe(200);
    expect(response.body.firstName).toEqual(createdUser.firstName);
    expect(response.body.lastName).toEqual(createdUser.lastName);
    expect(response.body.id).toEqual(createdUser.id);
    expect(response.body.userName).toEqual(createdUser.userName);
    expect(response.body.password).toBeUndefined();
  });

  it('current user can show all users', async () => {
    const response = await request.get('/api/users').set({ ...jsonHeaders, Authorization: token });
    expect(response.status).toBe(200);
    expect(response.body[0].firstName).toEqual(currentUser.firstName);
    expect(response.body[0].lastName).toEqual(currentUser.lastName);
    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].userName).toEqual(currentUser.userName);
    expect(response.body[0].password).toBeUndefined();

    expect(response.body[1].firstName).toEqual(createdUser.firstName);
    expect(response.body[1].lastName).toEqual(createdUser.lastName);
    expect(response.body[1].id).toEqual(createdUser.id);
    expect(response.body[1].userName).toEqual(createdUser.userName);
    expect(response.body[1].password).toBeUndefined();
  });
});