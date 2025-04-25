import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import TopUsersByBookings from './TopUsersAdmin';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('TopUsersByBookings', () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    const mockUsers = [
        { userId: '1', username: 'User1', email: 'user1@example.com', phoneNumber: '1234567890', moviesBooked: 5 },
        { userId: '2', username: 'User2', email: 'user2@example.com', phoneNumber: '0987654321', moviesBooked: 3 },
    ];

    beforeEach(() => {
        localStorage.setItem('adminToken', 'test-token');
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should redirect to login if no admin token is found', () => {
        localStorage.removeItem('adminToken');
        render(
            <BrowserRouter>
                <TopUsersByBookings />
            </BrowserRouter>
        );
        expect(navigate).toHaveBeenCalledWith('/login');
    });

    it('should fetch and display top users', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });
        mockedAxios.get.mockResolvedValueOnce({ data: [{}, {}, {}, {}, {}] }); // Mock movie bookings

        render(
            <BrowserRouter>
                <TopUsersByBookings />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Top Users by Movie Bookings')).toBeInTheDocument();
            expect(screen.getByText('User1')).toBeInTheDocument();
            expect(screen.getByText((content, element) => content.includes('user1@example.com') && element?.tagName === 'P')).toBeInTheDocument();
            expect(screen.getByText((content, element) => content.includes('1234567890') && element?.tagName === 'P')).toBeInTheDocument();
        });
    });

    it('should handle errors when fetching users', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Error fetching users'));

        render(
            <BrowserRouter>
                <TopUsersByBookings />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.queryByText('User1')).not.toBeInTheDocument();
        });
    });
});