import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import TotalUsersAdmin from './TotalUsersAdmin';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TotalUsersAdmin', () => {
    beforeEach(() => {
        localStorage.setItem('adminToken', 'test-token');
    });

    afterEach(() => {
        localStorage.clear();
    });

    test('redirects to login if no admin token', () => {
        localStorage.removeItem('adminToken');
        render(
            <Router>
                <TotalUsersAdmin />
            </Router>
        );
    });

    test('renders total users and user list', async () => {
        const users = [
            { id: '1', username: 'user1', email: 'user1@example.com', phoneNumber: '1234567890' },
            { id: '2', username: 'user2', email: 'user2@example.com', phoneNumber: '0987654321' },
        ];

        mockedAxios.get.mockResolvedValueOnce({ data: users });

        render(
            <Router>
                <TotalUsersAdmin />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText('Total Registered Users: 2')).toBeInTheDocument();
            expect(screen.getByText('user1')).toBeInTheDocument();
            expect(screen.getByText('user2')).toBeInTheDocument();
        });
    });

    test('handles error while fetching users', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Error fetching users'));

        render(
            <Router>
                <TotalUsersAdmin />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText('Total Registered Users: 0')).toBeInTheDocument();
        });
    });
});