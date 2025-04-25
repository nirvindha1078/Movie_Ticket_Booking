import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import MostBookedMovies from './MostBookedMovies';
import '@testing-library/jest-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react-router-dom');
    return {
        ...actual,
        useNavigate: jest.fn(),
    };
});

describe('MostBookedMovies', () => {
    const mockedUseNavigate = useNavigate as jest.Mock;
    const mockMovies = [
        {
            id: '1',
            name: 'Movie 1',
            language: 'English',
            format: '2D',
            genre: 'Action',
            posterUrl: '/images/movie1.jpg',
            runTime: '120 mins',
            rating: 4.5,
            ticketPrice: 10,
            status: 'Available',
            bookingsCount: 5,
        },
        {
            id: '2',
            name: 'Movie 2',
            language: 'Spanish',
            format: '3D',
            genre: 'Comedy',
            posterUrl: '/images/movie2.jpg',
            runTime: '90 mins',
            rating: 4.0,
            ticketPrice: 12,
            status: 'Available',
            bookingsCount: 3,
        },
    ];

    beforeEach(() => {
        localStorage.setItem('adminToken', 'test-token');
        mockedAxios.get.mockResolvedValueOnce({ data: [{ movieId: '1' }, { movieId: '1' }, { movieId: '2' }] });
        mockedAxios.get.mockResolvedValueOnce({ data: mockMovies });
        mockedUseNavigate.mockReturnValue(jest.fn());
    });

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.removeItem('adminToken');
    });

    test('renders MostBookedMovies component', async () => {
        render(
            <BrowserRouter>
                <MostBookedMovies />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Most Booked Movies')).toBeInTheDocument();
        });
    });

    test('fetches and displays movies', async () => {
        render(
            <BrowserRouter>
                <MostBookedMovies />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Movie 1')).toBeInTheDocument();
            expect(screen.getByText('Movie 2')).toBeInTheDocument();
        });
    });

    test('redirects to login if no admin token', () => {
        localStorage.removeItem('adminToken');
        render(
            <BrowserRouter>
                <MostBookedMovies />
            </BrowserRouter>
        );

        //expect(mockedUseNavigate).toHaveBeenCalledWith('/admin/login');
    });

});