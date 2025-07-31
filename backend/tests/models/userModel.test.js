// User model validation and method tests

const User = require('../../models/userModel');
const { testUsers } = require('../testHelpers');

describe('User Model', () => {

    describe('Password Hashing', () => {

        test('should hash password before saving', async () => {
            const user = new User(testUsers.user1);
            await user.save();

            // Password should be hashed, not plain text
            expect(user.password).not.toBe(testUsers.user1.password);
            expect(user.password).toMatch(/^\$2[ayb]\$.{56}$/); // bcrypt format
        });

        test('should not re-hash password if not modified', async () => {
            const user = await User.create(testUsers.user1);
            const hashedPassword = user.password;

            // Update user without changing password
            user.name = 'Updated Name';
            await user.save();

            expect(user.password).toBe(hashedPassword);
        });
    });

    describe('Password Comparison', () => {
        let user;

        beforeEach(async () => {
            user = await User.create(testUsers.user1);
        });

        test('should return true for correct password', async () => {
            const isMatch = await user.comparePassword(testUsers.user1.password);
            expect(isMatch).toBe(true);
        });

        test('should return false for incorrect password', async () => {
            const isMatch = await user.comparePassword('wrongpassword');
            expect(isMatch).toBe(false);
        });

        test('should handle empty password', async () => {
            const isMatch = await user.comparePassword('');
            expect(isMatch).toBe(false);
        });
    });

    describe('Validation', () => {
        test('should require name, email, and password', async () => {
            const user = new User({});
            
            let error;
            try {
                await user.save();
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            expect(error.errors.name).toBeDefined();
            expect(error.errors.email).toBeDefined();
            expect(error.errors.password).toBeDefined();
        });

        test('should enforce unique email', async () => {
            await User.create(testUsers.user1);

            let error;
            try {
                await User.create(testUsers.user1); // Same email
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            expect(error.code).toBe(11000); // MongoDB duplicate key error
        });

        test('should convert email to lowercase', async () => {
            const user = await User.create({
                ...testUsers.user1,
                email: 'JOHN@TEST.COM'
            });

            expect(user.email).toBe('john@test.com');
        });

        test('should enforce minimum password length', async () => {
            let error;
            try {
                await User.create({
                    ...testUsers.user1,
                    password: '123' // Too short
                });
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            expect(error.errors.password).toBeDefined();
        });
    });
});
