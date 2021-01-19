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
  let tokens: Tokens;

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

    const response = await request(app.getHttpServer())
      .post('/user/login')
      .send({ email: 'example-1@example.com', password: '111111' });

    tokens = response.body;
    console.log('Tokens: ', tokens);
  });

  afterAll(async () => {

    if (process.env.NODE_ENV === 'test') {
      const connection = app.get(Connection);
      await connection.synchronize(true);
      await deleteTestData(connection, User);
      await deleteTestData(connection, Proxy);
    }

    await Promise.all([
      app.close(),
    ])

  });

  describe('[e2e] UserController /user', () => {

    describe('/ (GET)', () => {

      it('Without access token', () => {
        return request(app.getHttpServer())
          .get('/user')
          .expect(401)
      });

      it('With access token', () => {
        return request(app.getHttpServer())
          .get('/user')
          .set('Authorization', `Bearer ${tokens.access_token}`)
          .expect(200)
      });

    });

    describe('/registration (POST)', () => {

      it('Registration with used email', () => {
        return request(app.getHttpServer())
          .post('/user/registration')
          .send({
            "login": "test-user",
            "email": "example-3@example.com",
            "password": "111111"
          })
          .expect(400)
          .expect({
            "statusCode":400,
            "message":"Email has been used"
          })
      });

      it('Registration with incorrect data', () => {
        return request(app.getHttpServer())
          .post('/user/registration')
          .send({
            "password": "111111"
          })
          .expect(400)
      });

      it('Registration with empty body', () => {
        return request(app.getHttpServer())
          .post('/user/registration')
          .expect(400)
      });

      it('Registration with correct data', () => {
        return request(app.getHttpServer())
          .post('/user/registration')
          .send({
            "login": "Test_user",
            "email": `test_user_email_@example.com`,
            "password": "111111"
          })
          .expect(201)
          .expect(`User Test_user has been created!`)
      });
    });

    describe('/login (POST)', () => {

      it('Login with incorrect email', () => {
        return request(app.getHttpServer())
          .post('/user/login')
          .send({
            "email": "example-34@example.com",
            "password": "111111"
          })
          .expect(400)
          .expect({
            "statusCode":400,
            "message":"Email or password incorrect!"
          })
      });

      it('Login with incorrect password', () => {
        return request(app.getHttpServer())
          .post('/user/login')
          .send({
            "email": "example-3@example.com",
            "password": "111112"
          })
          .expect(400)
          .expect({
            "statusCode":400,
            "message":"Email or password incorrect!"
          })
      });

      it('Login with correct data', () => {
        return request(app.getHttpServer())
          .post('/user/login')
          .send({
            "email": "example-4@example.com",
            "password": "111111"
          })
          .expect(201)
          // .expect(Tokens)
      });
    });

    describe('/refresh-tokens (POST)', () => {

      it('Login with incorrect password', () => {
        return request(app.getHttpServer())
          .post('/user/login')
          .send({
            "email": "example111@example.com",
            "password": "111112"
          })
          .expect(400)
          .expect({
            "statusCode":400,
            "message":"Email or password incorrect!"
          })
      });
    });

    describe('/activate (GET)', () => {});

    describe('/edit (PUT)', () => {});

    describe('/list (GET)', () => {});

    describe('/delete (DELETE)', () => {});

    describe('/change (PUT)', () => {});

    describe('/password (PATCH)', () => {});

    describe('/logout (GET)', () => {});

  });

});
