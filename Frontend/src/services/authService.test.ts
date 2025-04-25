import AuthService from './authService';
import api from '../utils/Api/api';

jest.mock('../utils/Api/api');

describe('AuthService', () => {
    describe('login', () => {
        it('should call api.post with the correct URL and payload', async () => {
            const email = 'test@example.com';
            const password = 'password123';
            const response = { data: 'mocked data' };
            (api.post as jest.Mock).mockResolvedValue(response);

            const result = await AuthService.login(email, password);

            expect(api.post).toHaveBeenCalledWith('/auth/login', { email, password });
            expect(result).toBe(response);
        });

        it('should handle errors correctly', async () => {
            const email = 'test@example.com';
            const password = 'password123';
            const error = new Error('Login failed');
            (api.post as jest.Mock).mockRejectedValue(error);

            await expect(AuthService.login(email, password)).rejects.toThrow('Login failed');
        });
    });

    describe('signup', () => {
        it('should call api.post with the correct URL and payload', async () => {
            const username = 'testuser';
            const email = 'test@example.com';
            const password = 'password123';
            const response = { data: 'mocked data' };
            (api.post as jest.Mock).mockResolvedValue(response);

            const result = await AuthService.signup(username, email, password);

            expect(api.post).toHaveBeenCalledWith('/auth/register', { username, email, password });
            expect(result).toBe(response);
        });

        it('should handle errors correctly', async () => {
            const username = 'testuser';
            const email = 'test@example.com';
            const password = 'password123';
            const error = new Error('Signup failed');
            (api.post as jest.Mock).mockRejectedValue(error);

            await expect(AuthService.signup(username, email, password)).rejects.toThrow('Signup failed');
        });
    });
});