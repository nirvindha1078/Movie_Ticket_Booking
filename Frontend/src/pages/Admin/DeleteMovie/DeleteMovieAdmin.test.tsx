import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import DeleteMovieAdmin from './DeleteMovieAdmin';

jest.mock('axios');
jest.spyOn(window, 'confirm').mockImplementation(() => true);

describe('DeleteMovieAdmin', () => {
    beforeEach(() => {
        localStorage.setItem('adminToken', 'test-token');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('fetches and displays movies', async () => {
        const movies = [
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
                status: 'Available',
            },
        ];
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: movies });

        render(
            <BrowserRouter>
                <DeleteMovieAdmin />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Movie 1')).toBeInTheDocument();
        });
    });

    test('removes a movie when delete button is clicked', async () => {
        const movies = [
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
                status: 'Available',
            },
        ];
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: movies });
        (axios.delete as jest.Mock).mockResolvedValueOnce({ status: 204 });

        render(
            <BrowserRouter>
                <DeleteMovieAdmin />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Movie 1')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Remove Movie'));
        fireEvent.click(screen.getByText('Yes'));

        await waitFor(() => {
            expect(screen.queryByText('Movie 1')).not.toBeInTheDocument();
            expect(screen.getByText('Movie removed successfully!')).toBeInTheDocument();
        });
    });
});