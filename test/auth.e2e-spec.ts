import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Auth (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    const email = `test_${Date.now()}@mail.com`;
    const password = 'password123';
    let token: string;

    it('REGISTER: should register new user', async () => {
        const res = await request(app.getHttpServer())
            .post('/auth/register')
            .send({ email, password });

        expect(res.status).toBe(201);
        expect(res.body.accessToken).toBeDefined();

        token = res.body.accessToken;
    });

    it('LOGIN: should login user', async () => {
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email, password });

        expect(res.status).toBe(200);
        expect(res.body.accessToken).toBeDefined();

        token = res.body.accessToken;
    });

    it('ME: should return current user', async () => {
        const res = await request(app.getHttpServer())
            .get('/auth/me')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.email).toBe(email);
        expect(res.body.id).toBeDefined();
    });

    it('ME: should fail without token', async () => {
        const res = await request(app.getHttpServer()).get('/auth/me');

        expect(res.status).toBe(401);
    });

    afterEach(async () => {
        await app.close();
    });
});
