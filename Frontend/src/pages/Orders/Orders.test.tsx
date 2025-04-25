import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import OrdersPage from './Orders';
import '@testing-library/jest-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('OrdersPage', () => {
    const mockOrders = [
        {
            orderId: '1',
            movieId: 'm1',
            userId: 'u1',
            theaterId: 't1',
            date: '2023-10-01',
            time: '18:00',
            seatsBooked: 2,
            totalPrice: 500,
        },
    ];

    const mockMovies = [
        {
            id: 'm1',
            name: 'Movie 1',
            language: 'English',
            format: '2D',
            genre: 'Action',
            posterUrl: '/poster1.jpg',
            runTime: '120',
            rating: 4.5,
            ticketPrice: 250,
            status: 'Running',
        },
    ];

    const mockTheaters = [
        {
            id: 't1',
            name: 'Theater 1',
            address: '123 Main St',
            timeSlots: [],
        },
    ];

    beforeEach(() => {
        localStorage.setItem('userId', 'u1');
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('renders loading message initially', () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockOrders });
        mockedAxios.get.mockResolvedValueOnce({ data: [] });
        render(<OrdersPage />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders orders when there are orders', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockOrders });
        mockedAxios.get.mockResolvedValueOnce({ data: mockMovies });
        mockedAxios.get.mockResolvedValueOnce({ data: mockTheaters });
        mockedAxios.get.mockResolvedValueOnce({ data: mockOrders });

        render(<OrdersPage />);
        await waitFor(() => expect(screen.getByText((content, element) => content.includes('Movie 1'))).toBeInTheDocument());
        expect(screen.getByText('Theater 1')).toBeInTheDocument();
        expect(screen.getByText('Rs.500')).toBeInTheDocument();
    });
});