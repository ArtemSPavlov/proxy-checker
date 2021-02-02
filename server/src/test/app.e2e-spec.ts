import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { Tokens } from '../user/types/tokens.type';
import { User } from '../user/user.entity';
import { Connection } from 'typeorm';
import { deleteTestData, loadTestData } from './dataHandlers';
import { PROXIES, USERS } from './testData';
import { Proxy } from '../proxy/proxy.entity';

describe('Start e2e tests', () => {
  let app: INestApplication;
  let adminTokens: Tokens;
  let userTokens: Tokens;
  const jwtRegExp = new RegExp('^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$');

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const connection = app.get(Connection);
    console.log(`Connect to ${connection.driver.database} database`);

    if (process.env.NODE_ENV === 'test') {
      await connection.synchronize(true);
      await loadTestData(connection, User, USERS);
      await loadTestData(connection, Proxy, PROXIES);
    }

    const adminValidationResponse = await request(app.getHttpServer())
      .post('/user/login')
      .send({ email: 'example-1@example.com', password: '111111' });

    adminTokens = adminValidationResponse.body;

    const userValidationResponse = await request(app.getHttpServer())
      .post('/user/login')
      .send({ email: 'example-2@example.com', password: '111111' });

    userTokens = userValidationResponse.body;
  });

  afterAll(async () => {

    if (process.env.NODE_ENV === 'test') {
      // const connection = app.get(Connection);
      // await connection.synchronize(true);
      // await deleteTestData(connection, User);
      // await deleteTestData(connection, Proxy);
    }

    await Promise.all([
      app.close(),
    ])

  });

  describe('[e2e] UserController /user', () => {

    describe('/ (GET)', () => {

      it('Without access token', async () => {
        const result = await request(app.getHttpServer())
          .get('/user')

          expect(result.status).toEqual(401);
      });

      it('With access token', async () => {
        const result = await request(app.getHttpServer())
          .get('/user')
          .set('Authorization', `Bearer ${adminTokens.access_token}`)

          expect(result.status).toEqual(200);
          expect(result.body.login).toEqual('test-user-1');
          expect(result.body.email).toEqual('example-1@example.com');
      });

    });

    describe('/ (PUT)', () => {

      it('Without access token', async () => {
        const result = await request(app.getHttpServer())
          .put('/user')
          .send({
            login: 'NewLogin'
          })

          expect(result.status).toEqual(401);
      });

      it('With empty request body', async () => {
        const result = await request(app.getHttpServer())
          .put('/user')
          .set('Authorization', `Bearer ${userTokens.access_token}`)

          expect(result.status).toEqual(400);
      });

      it('With invalid data', async () => {
        const result = await request(app.getHttpServer())
          .put('/user')
          .set('Authorization', `Bearer ${userTokens.access_token}`)
          .send({
            login: 'aa'
          })

          expect(result.status).toEqual(400);
      });

      it('With valid data', async () => {
        const result = await request(app.getHttpServer())
          .put('/user')
          .set('Authorization', `Bearer ${userTokens.access_token}`)
          .send({
            login: 'NewLogin'
          })

          expect(result.status).toEqual(200);
          expect(result.body.login).toEqual('NewLogin');
      });
    });

    describe('/ (PATCH)', () => {

      it('Without access token', async () => {
        const result = await request(app.getHttpServer())
          .patch('/user')

          expect(result.status).toEqual(401);
      });

      it('With empty request body', async () => {
        const result = await request(app.getHttpServer())
          .patch('/user')
          .set('Authorization', `Bearer ${userTokens.access_token}`)

          expect(result.status).toEqual(400);
      });

      it('With invalid password', async () => {
        const result = await request(app.getHttpServer())
          .patch('/user')
          .set('Authorization', `Bearer ${userTokens.access_token}`)
          .send({
            email: 'example-2@example.com',
            password: 'aa'
          })

          expect(result.status).toEqual(400);
      });

      it('With invalid email', async () => {
        const result = await request(app.getHttpServer())
          .patch('/user')
          .set('Authorization', `Bearer ${userTokens.access_token}`)
          .send({
            email: 'example-2334@example.com',
            password: '111111'
          })

          expect(result.status).toEqual(400);
      });

      it('With correct data', async () => {
        const result = await request(app.getHttpServer())
          .patch('/user')
          .set('Authorization', `Bearer ${userTokens.access_token}`)
          .send({
            email: 'example-2@example.com',
            password: 'NewPassword'
          })

          expect(result.status).toEqual(200);
          expect(result.text).toEqual('Password changed!');
      });
    });

    describe('/ (POST)', () => {

      it('Registration with used email', async () => {
        const result = await request(app.getHttpServer())
          .post('/user')
          .send({
            "login": "test-user",
            "email": "example-3@example.com",
            "password": "111111"
          })

          expect(result.status).toEqual(400);
          expect(result.body.message).toEqual('Email has been used');
      });

      it('Registration with invalid data', async () => {
        const result = await request(app.getHttpServer())
          .post('/user')
          .send({
            "password": "111111"
          })

          expect(result.status).toEqual(400);
      });

      it('Registration with empty body', async () => {
        const result = await request(app.getHttpServer())
          .post('/user')

          expect(result.status).toEqual(400);
      });

      it('Registration with valid data', async () => {
        const result = await request(app.getHttpServer())
          .post('/user')
          .send({
            "login": "Test_user",
            "email": `test_user_email_@example.com`,
            "password": "111111"
          })

          expect(result.status).toEqual(201);
          expect(result.text).toEqual('User Test_user has been created!');
      });
    });

    describe('/login (POST)', () => {

      it('Login with invalid email', async () => {
        const result = await request(app.getHttpServer())
          .post('/user/login')
          .send({
            "email": "example-34@example.com",
            "password": "111111"
          })

          expect(result.status).toEqual(400);
          expect(result.body.message).toEqual('Email or password incorrect!');
      });

      it('Login with invalid password', async () => {
        const result = await request(app.getHttpServer())
          .post('/user/login')
          .send({
            "email": "example-3@example.com",
            "password": "111112"
          })

          expect(result.status).toEqual(400);
          expect(result.body.message).toEqual('Email or password incorrect!');
      });

      it('Login with valid data', async () => {
        const result = await request(app.getHttpServer())
          .post('/user/login')
          .send({
            "email": "example-4@example.com",
            "password": "111111"
          })

          expect(result.status).toEqual(201);
          expect(result.body.access_token).toMatch(jwtRegExp);
          expect(result.body.refresh_token).toMatch(jwtRegExp);
      });
    });

    describe('/edit (PUT)', () => {

      it('Without access token', async () => {
        const result = await request(app.getHttpServer())
          .put('/user/edit/3')
          .send({
            "login": "test-user-1-changed"
          })

          expect(result.status).toEqual(401);
      });

      it('With user permissions', async () => {
        const result = await request(app.getHttpServer())
          .put('/user/edit/3')
          .set('Authorization', `Bearer ${userTokens.access_token}`)
          .send({
            "login": "test-user-1-changed"
          })

          expect(result.status).toEqual(403);
      });

      it('With invalid login length', async () => {
        const result = await request(app.getHttpServer())
          .put('/user/edit/3')
          .set('Authorization', `Bearer ${adminTokens.access_token}`)
          .send({
            "login": "aa"
          })

          expect(result.status).toEqual(400);
      });

      it('With invalid data type', async () => {
        const result = await request(app.getHttpServer())
          .put('/user/edit/3')
          .set('Authorization', `Bearer ${adminTokens.access_token}`)
          .send({
            "isActive": "string"
          })

          expect(result.status).toEqual(400);
      });

      it('With invalid user id type', async () => {
        const result = await request(app.getHttpServer())
          .put('/user/edit/abc')
          .set('Authorization', `Bearer ${adminTokens.access_token}`)
          .send({
            "login": "test-user-1-changed-incorrect"
          })

          expect(result.status).toEqual(400);
      });

      it('With invalid user id', async () => {
        const result = await request(app.getHttpServer())
          .put('/user/edit/33')
          .set('Authorization', `Bearer ${adminTokens.access_token}`)
          .send({
            "login": "test-user-1-changed-incorrect"
          })

          expect(result.status).toEqual(400);
          expect(result.body.message).toEqual('User not found!');
      });

      it('With invalid data', async () => {
        const result = await request(app.getHttpServer())
          .put('/user/edit/3')
          .set('Authorization', `Bearer ${adminTokens.access_token}`)
          .send({
            "name": "test-user-1-changed-incorrect"
          })

          expect(result.status).toEqual(400);
      });

      it('With valid data', async () => {
        const result = await request(app.getHttpServer())
          .put('/user/edit/3')
          .set('Authorization', `Bearer ${adminTokens.access_token}`)
          .send({
            "login": "test-user-1-changed"
          })

          expect(result.status).toEqual(200);
          expect(result.text).toEqual('User test-user-3 updated!');
      });
    });

    describe('/list (GET)', () => {

      it('Without access token', async () => {
        const result = await request(app.getHttpServer())
          .get('/user/list')
          .send({
            "login": "test-user-1-changed"
          })

          expect(result.status).toEqual(401);
      });

      it('With user permissions', async () => {
        const result = await request(app.getHttpServer())
          .get('/user/list')
          .set('Authorization', `Bearer ${userTokens.access_token}`)

          expect(result.status).toEqual(403);
      });

      it('With admin permissions', async () => {
        const result = await request(app.getHttpServer())
          .get('/user/list')
          .set('Authorization', `Bearer ${adminTokens.access_token}`)

          expect(result.status).toEqual(200);
          expect(result.body[0].login).toEqual('test-user-1');
          expect(result.body[2].email).toEqual('example-5@example.com');
      });
    });

    describe('/delete (DELETE)', () => {

      it('Without access token', async () => {
        const result = await request(app.getHttpServer())
          .delete('/user/delete/5')

          expect(result.status).toEqual(401);
      });

      it('With user permissions', async () => {
        const result = await request(app.getHttpServer())
          .delete('/user/delete/5')
          .set('Authorization', `Bearer ${userTokens.access_token}`)

          expect(result.status).toEqual(403);
      });

      it('With invalid user id type', async () => {
        const result = await request(app.getHttpServer())
          .delete('/user/delete/abc')
          .set('Authorization', `Bearer ${adminTokens.access_token}`)

          expect(result.status).toEqual(400);
      });

      it('With invalid user id', async () => {
        const result = await request(app.getHttpServer())
          .delete('/user/delete/13')
          .set('Authorization', `Bearer ${adminTokens.access_token}`)

          expect(result.status).toEqual(400);
          expect(result.body.message).toEqual('User not found!');
      });

      it('With valid id', async () => {
        const result = await request(app.getHttpServer())
          .delete('/user/delete/5')
          .set('Authorization', `Bearer ${adminTokens.access_token}`)

          expect(result.status).toEqual(200);
          expect(result.text).toEqual('User test-user-5 deleted!');
      });
    });


    describe('/refresh (POST)', () => {

      it('With empty request body', async () => {
        const result = await request(app.getHttpServer())
          .post('/user/refresh')

          expect(result.status).toEqual(400);
      });

      it('With ivalid refresh token', async () => {
        const result = await request(app.getHttpServer())
          .post('/user/refresh')
          .send({
            refreshToken: adminTokens.refresh_token + '!'
          })

          expect(result.status).toEqual(400);
          expect(result.body.message).toEqual('Refresh token not valid');
      });

      it('With valid refresh token', async () => {
        const result = await request(app.getHttpServer())
          .post('/user/refresh')
          .send({
            refreshToken: adminTokens.refresh_token
          })

          expect(result.status).toEqual(201);
          expect(result.body.access_token).toMatch(jwtRegExp);
          expect(result.body.refresh_token).toMatch(jwtRegExp);
      });
    });
  });

  describe('[e2e] ProxyController /proxy', () => {

    describe('/ (GET)', () => {

      it('Without access token', async () => {
        const result = await request(app.getHttpServer())
          .get('/proxy')

          expect(result.status).toEqual(401);
      });

      it('Without valid token', async () => {
        const result = await request(app.getHttpServer())
          .get('/proxy')
          .set('Authorization', `Bearer ${userTokens.access_token}`)

          expect(result.status).toEqual(200);
          expect(result.body[3].host).toEqual('194.190.136.35');
          expect(result.body[5].host).toEqual('81.163.97.238');
      });
    })

    describe('/ (POST)', () => {

      it('Without access token', async () => {
        const result = await request(app.getHttpServer())
          .post('/proxy')

          expect(result.status).toEqual(401);
      });

      it('With low permissions', async () => {
        const result = await request(app.getHttpServer())
          .post('/proxy')
          .set('Authorization', `Bearer ${userTokens.access_token}`)

          expect(result.status).toEqual(403);
      });

      it('With invalid data', async () => {
        const result = await request(app.getHttpServer())
          .post('/proxy')
          .set('Authorization', `Bearer ${adminTokens.access_token}`)
          .send({
            proxies: [{
            type: 0,
            host: '111.111.11.11',
            port: 'abcd',
            country: '',
          },
          {
            type: 1,
            host: '11.11.11.11',
            port: 1111,
            country: '',
          }]})

          expect(result.status).toEqual(400);
      });

      it('With invalid data', async () => {
        const result = await request(app.getHttpServer())
          .post('/proxy')
          .set('Authorization', `Bearer ${adminTokens.access_token}`)
          .send({
            proxies: [{
            type: 0,
            host: '111.111.11.11',
            port: 'abcd',
            country: '',
          },
          {
            type: 1,
            port: 1111,
            country: '',
          }]})

          expect(result.status).toEqual(400);
      });

      it('With valid data', async () => {
        const result = await request(app.getHttpServer())
          .post('/proxy')
          .set('Authorization', `Bearer ${adminTokens.access_token}`)
          .send({
            proxies: [{
            type: 0,
            host: '111.111.11.11',
            port: 1111,
            country: '',
          },
          {
            type: 1,
            host: '11.11.11.11',
            port: 1111,
            country: '',
          }]})

          expect(result.status).toEqual(201);
          expect(result.text).toEqual('Saved in database');
      });
    })

    describe('/ (DELETE)', () => {
      it('Without access token', async () => {
        const result = await request(app.getHttpServer())
          .delete('/proxy')
          .send({
            proxies: [{
              host:'84.42.63.99'
            },{
              host:'78.29.81.187',
              port:8080
            },{
              host:'81.163.97.238',
              port:8080
            }]
          })

          expect(result.status).toEqual(401);
      });

      it('With low permissions', async () => {
        const result = await request(app.getHttpServer())
          .delete('/proxy')
          .set('Authorization', `Bearer ${userTokens.access_token}`)
          .send({
            proxies: [{
              host:'84.42.63.99'
            },{
              host:'78.29.81.187',
              port:8080
            },{
              host:'81.163.97.238',
              port:8080
            }]
          })

          expect(result.status).toEqual(403);
      });

      it('With invalid data', async () => {
        const result = await request(app.getHttpServer())
          .delete('/proxy')
          .set('Authorization', `Bearer ${adminTokens.access_token}`)
          .send({
            proxies: [{
              host:'84.42.63.99'
            },{
              host:'78.29.81.187',
              port:8080
            },{
              host:'81.163.97.238',
              port:8080
            }]
          })

          expect(result.status).toEqual(400);
      });

      it('With valid data', async () => {
        const result = await request(app.getHttpServer())
          .delete('/proxy')
          .set('Authorization', `Bearer ${adminTokens.access_token}`)
          .send({
            proxies: [{
              host:'84.42.63.99',
              port:3128
            },{
              host:'78.29.81.187',
              port:8080
            },{
              host:'81.163.97.238',
              port:8080
            }]
          })

          expect(result.status).toEqual(200);
          expect(result.text).toEqual('Proxies has been deleted');
      });
    })

    describe('/update (GET)', () => {

    })
  })

});
