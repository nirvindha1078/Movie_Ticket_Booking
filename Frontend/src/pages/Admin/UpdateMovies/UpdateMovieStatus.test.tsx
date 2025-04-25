import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import MovieUpdatePage from './UpdateMovieStatus';

jest.mock('axios');

describe('MovieUpdatePage', () => {
    const mockMovies = [
        {
            id: '1',
            name: 'Movie 1',
            language: 'English',
            format: '2D',
            genre: 'Action',
            posterUrl: '/poster1.jpg',
            runTime: '120 min',
            rating: 4.5,
            ticketPrice: 10,
            status: 'Upcoming',
        },
    ];

    beforeEach(() => {
        localStorage.setItem('adminToken', 'test-token');
        (axios.get as jest.Mock).mockResolvedValue({ data: mockMovies });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders movie update page', async () => {
        render(
            <Router>
                <MovieUpdatePage />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText('Update the status')).toBeInTheDocument();
            expect(screen.getByText('Movie 1')).toBeInTheDocument();
        });
    });

    test('updates movie status', async () => {
        (axios.put as jest.Mock).mockResolvedValue({ status: 200 });

        render(
            <Router>
                <MovieUpdatePage />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText('Movie 1')).toBeInTheDocument();
        });

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Running' } });
        fireEvent.click(screen.getByText('Update Status'));

        await waitFor(() => {
            expect(screen.getByText('Movie status updated successfully!')).toBeInTheDocument();
        });
    });

    test('shows error when status is not selected', async () => {
        const toastMock = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <Router>
                <MovieUpdatePage />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText('Movie 1')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Update Status'));

        await waitFor(() => {
            expect(screen.getByText('Please select a status!')).toBeInTheDocument();
        });

        toastMock.mockRestore();
    });
});