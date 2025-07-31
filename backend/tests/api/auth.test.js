// Auth endpoint tests

const request = require('supertest');
const app = require('../testApp');
const User = require('../../models/userModel');
const { testUsers, createTestUser } = require('../testHelpers');

describe('Authentication Endpoints', () => {
    
    // ----------------- Register endpoint -------------------
    describe('POST /api/v1/auth/register', () => {
        // SUCCESS testing
        test('should register a new user successfully', async () => {
            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(testUsers.user1)
                .expect(201);

            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('name', testUsers.user1.name);
            expect(response.body).toHaveProperty('email', testUsers.user1.email);
            expect(response.body).toHaveProperty('token');
            expect(response.body).not.toHaveProperty('password');
        });

        // ERROR testing
        test('should not register user with existing email', async () => {
            // Create user first
            await createTestUser(testUsers.user1);

            // Try to register same email again
            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(testUsers.user1)
                .expect(400);

            expect(response.body).toHaveProperty('message');
        });

        test('should not register user with missing fields', async () => {
            const response = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    name: 'John Doe',
                    // no email and password
                })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toContain('required');
        });

        test('should not register user with short password', async () => {
            const response = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    ...testUsers.user1,
                    password: '123' // too short
                })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toContain('8 characters');
        });
    });



    // ----------------- Login endpoint -------------------
    describe('POST /api/v1/auth/login', () => {

        // Create a user before each login test
        beforeEach(async () => {
            await createTestUser(testUsers.user1);
        });

        // SUCCESS TESTING
        test('should login with valid credentials', async () => {
            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: testUsers.user1.email,
                    password: testUsers.user1.password
                })
                .expect(200);

            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('email', testUsers.user1.email);
            expect(response.body).not.toHaveProperty('password');
        });

        // ERROR Testing
        test('should not login with invalid email', async () => {
            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'wrong@email.com',
                    password: testUsers.user1.password
                })
                .expect(401);

            expect(response.body.message).toContain('Invalid email or password');
        });

        test('should not login with invalid password', async () => {
            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: testUsers.user1.email,
                    password: 'wrongpassword'
                })
                .expect(401);

            expect(response.body.message).toContain('Invalid email or password');
        });

        test('should not login with missing credentials', async () => {
            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: testUsers.user1.email
                    // missing password
                })
                .expect(400);

            expect(response.body.message).toContain('required');
        });
    });



    // ----------------- Profile endpoint -------------------
    describe('GET /api/v1/auth/profile', () => {

        // SUCCESS Testing
        test('should get user profile with valid token', async () => {
            const user = await createTestUser(testUsers.user1);
            
            // Login to get token
            const loginResponse = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: testUsers.user1.email,
                    password: testUsers.user1.password
                });

            const token = loginResponse.body.token;

            // Get profile
            const response = await request(app)
                .get('/api/v1/auth/profile')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('email', testUsers.user1.email);
            expect(response.body).not.toHaveProperty('password');
        });

        // ERROR Testing
        test('should not get profile without token', async () => {
            const response = await request(app)
                .get('/api/v1/auth/profile')
                .expect(401);

            expect(response.body.message).toContain('no token');
        });

        test('should not get profile with invalid token', async () => {
            const response = await request(app)
                .get('/api/v1/auth/profile')
                .set('Authorization', 'Bearer invalid_token')
                .expect(401);

            expect(response.body.message).toContain('Authorisation failed');
        });
    });
});