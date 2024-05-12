import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import { User } from '../src/users/user.entity';
import { Scooter, ScooterStatus } from '../src/scooters/scooter.entity';
import { AuthService } from '../src/auth/auth.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('this is rental api');
  });

  afterAll(async () => {
    await app.close();
  });
});

describe('Renting flow (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const builder = Test.createTestingModule({
      imports: [AppModule],
    });

    const moduleFixture: TestingModule = await builder.compile();
    app = moduleFixture.createNestApplication();

    const dataSource = moduleFixture.get<DataSource>(DataSource);
    await dataSource.query(
      'TRUNCATE TABLE public.user RESTART IDENTITY CASCADE',
    );
    await dataSource.query(
      'TRUNCATE TABLE public.scooter RESTART IDENTITY CASCADE',
    );
    await dataSource.query(
      'TRUNCATE TABLE public.rent RESTART IDENTITY CASCADE',
    );

    const u = new User();
    u.lastName = 'Doe';
    u.firstName = 'John';
    u.username = 'johndoe';
    u.password = await AuthService.hashPassword('password');
    u.isActive = true;

    await dataSource.manager.save(u);

    const scooters = [
      {
        scooterId: 1,
        firstName: 'John',
        scooterName: 'Scooter 1',
        status: ScooterStatus.Available,
        lastRentedTime: '2021-09-01T00:00:00.000Z',
      },
      {
        scooterId: 2,
        firstName: 'Jane',
        scooterName: 'Scooter 2',
        status: ScooterStatus.Rented,
        lastRentedTime: new Date('2021-09-01T00:00:00.000Z'),
      },
      {
        scooterId: 3,
        firstName: 'Jack',
        scooterName: 'Scooter 3',
        status: ScooterStatus.Available,
        lastRentedTime: new Date('2021-09-01T00:00:00.000Z'),
      },
    ];

    await dataSource.manager
      .createQueryBuilder()
      .insert()
      .into(Scooter)
      .values(scooters)
      .execute();
    await app.init();
  });

  let scooter: { scooterId: string; status: 'Available' };

  it('/scooters GET retrieve currently available scooters', async () => {
    return request(app.getHttpServer())
      .get('/scooters?status=Available')
      .expect(200)
      .then(async (response) => {
        expect(response.body).toHaveLength(2);

        scooter = response.body[0];
      });
  });

  it('/rents POST rent a scooter', async () => {
    await request(app.getHttpServer())
      .post('/rents')
      .send({
        scooterId: scooter.scooterId,
        userId: 1,
      })
      .expect(201)
      .then(async (response) => {
        expect(response.body).toHaveProperty('rentId');
        return response.body;
      });

    return await request(app.getHttpServer())
      .get('/scooters?status=Available')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(1);
        return response.body;
      });
  });
});
