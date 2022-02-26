import jasmine from 'jasmine';
import supertest from 'supertest';
import app from '../server';
import { User, UserModel } from '../models/user';
import { Product } from '../models/product';
import { Order, OrderModel } from '../models/order';
import { Category, CategoryModel } from '../models/category';
import { Status, StatusModel } from '../models/status';
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

let product_1: Product = {
  id: 1,
  name: 'product_1',
  price: 1,
  categoryId: 1
};

let product_2: Product = {
  id: 2,
  name: 'product_2',
  price: 1,
  categoryId: 2
};

let product_3: Product = {
  id: 3,
  name: 'product_3',
  price: 1,
  categoryId: 3
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

describe('Products Route tests', () => {
  beforeAll(async () => {
    await CategoryModel.create({name: "category_1"});
    await CategoryModel.create({name: "category_2"});
    await CategoryModel.create({name: "category_3"});
  });

  it('current user can create a product', async () => {
    const response = await request.post('/api/products').set({ ...jsonHeaders, Authorization: token }).send(product_1);
    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(product_1.id);
    expect(response.body.name).toEqual(product_1.name);
    expect(parseInt(response.body.price)).toEqual(product_1.price);
    expect(response.body.category_id).toEqual(product_1.categoryId);

    const response_2 = await request.post('/api/products').set({ ...jsonHeaders, Authorization: token }).send(product_2);
    expect(response_2.status).toBe(200);
    expect(response_2.body.id).toEqual(product_2.id);
    expect(response_2.body.name).toEqual(product_2.name);
    expect(parseInt(response_2.body.price)).toEqual(product_2.price);
    expect(response_2.body.category_id).toEqual(product_2.categoryId);

    const response_3 = await request.post('/api/products').set({ ...jsonHeaders, Authorization: token }).send(product_3);
    expect(response_3.status).toBe(200);
    expect(response_3.body.id).toEqual(product_3.id);
    expect(response_3.body.name).toEqual(product_3.name);
    expect(parseInt(response_3.body.price)).toEqual(product_3.price);
    expect(response_3.body.category_id).toEqual(product_3.categoryId);
  });

  it('current user can show a product', async () => {
    const response = await request.get('/api/products/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(product_1.id);
    expect(response.body.name).toEqual(product_1.name);
    expect(parseInt(response.body.price)).toEqual(product_1.price);
    expect(response.body.category_id).toEqual(product_1.categoryId);
  });

  it('current user can show all product', async () => {
    const response = await request.get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body[0].id).toEqual(product_1.id);
    expect(response.body[0].name).toEqual(product_1.name);
    expect(parseInt(response.body[0].price)).toEqual(product_1.price);
    expect(response.body[0].category_id).toEqual(product_1.categoryId);

    expect(response.body[1].id).toEqual(product_2.id);
    expect(response.body[1].name).toEqual(product_2.name);
    expect(parseInt(response.body[1].price)).toEqual(product_2.price);
    expect(response.body[1].category_id).toEqual(product_2.categoryId);

    expect(response.body[2].id).toEqual(product_3.id);
    expect(response.body[2].name).toEqual(product_3.name);
    expect(parseInt(response.body[2].price)).toEqual(product_3.price);
    expect(response.body[2].category_id).toEqual(product_3.categoryId);
  });

  it('current user can show all product od specific category', async () => {
    const response = await request.get('/api/products/category/3');
    expect(response.status).toBe(200);
    expect(response.body[0].id).toEqual(product_3.id);
    expect(response.body[0].name).toEqual(product_3.name);
    expect(parseInt(response.body[0].price)).toEqual(product_3.price);
    expect(response.body[0].category_id).toEqual(product_3.categoryId);
  });

});

describe('Orders Route tests', () => {
  beforeAll(async () => {
    
    await OrderModel.create({userId:1,statusId:1})
    await OrderModel.create({userId:2,statusId:1})
    await OrderModel.create({userId:1,statusId:2})
    await OrderModel.create({userId:2,statusId:2})
  });

  it('current user can show orders by user', async () => {
    const response = await request.get('/api/orders/user/1').set({ ...jsonHeaders, Authorization: token });
    expect(response.status).toBe(200);
    expect(response.body[0].user_id).toEqual(1);
    expect(response.body[1].user_id).toEqual(1);

    const response_2 = await request.get('/api/orders/user/2').set({ ...jsonHeaders, Authorization: token });
    expect(response_2.status).toBe(200);
    expect(response_2.body[0].user_id).toEqual(createdUser.id);
    expect(response_2.body[1].user_id).toEqual(createdUser.id);
  });

  it('current user can show completed orders by user', async () => {
    const response = await request.get('/api/orders/user/1/status/2').set({ ...jsonHeaders, Authorization: token });
    expect(response.status).toBe(200);
    expect(response.body[0].user_id).toEqual(1);
    expect(response.body[0].status_id).toEqual(2);

    const response_2 = await request.get('/api/orders/user/2/status/2').set({ ...jsonHeaders, Authorization: token });
    expect(response_2.status).toBe(200);
    expect(response_2.body[0].user_id).toEqual(createdUser.id);
    expect(response_2.body[0].status_id).toEqual(2);
  });

});