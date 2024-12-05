import request from 'supertest';
import { createExpressServer } from '../config/serverExpress';
import { UserCreataion } from '../types/validation';

const app = createExpressServer();

describe('Users Router', () => {
    it('should return 200 and list of users on GET /api/users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // it('should return 201 and create a new user on POST /api/users', async () => {
    //     const newUser: UserCreataion = { name: 'John Doe', role: 'requester' };
    //     const response = await request(app).post('/api/users').send(newUser);
    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('id');
    //     expect(response.body.name).toBe(newUser.name);
    //     expect(response.body.role).toBe(newUser.role);
    // });
});