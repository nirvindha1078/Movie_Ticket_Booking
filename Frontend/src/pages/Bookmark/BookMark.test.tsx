import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import BookMark from './BookMark';
import { useUserContext } from '../../context/User/UserContext';

jest.mock('axios');
jest.mock('../../context/User/UserContext');

const mockUseUserContext = useUserContext as jest.MockedFunction<typeof useUserContext>;

describe('BookMark Component', () => {
    beforeEach(() => {
        mockUseUserContext.mockReturnValue({
            userId: 'testUser',
            bookmark: ['1', '2'],
            setBookmark: jest.fn(),
            watchlist: [],
            setWatchlist: jest.fn(),
            fetchUserData: jest.fn(),
        });
    });

    it('renders loading state initially', () => {
        render(<BookMark />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders movies when fetched successfully', async () => {
        const movies = [
            { id: '1', name: 'Movie 1', language: 'English', posterUrl: '/poster1.jpg' },
            { id: '2', name: 'Movie 2', language: 'Spanish', posterUrl: '/poster2.jpg' },
        ];
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: movies });

        render(<BookMark />);

        await waitFor(() => expect(screen.getByText('Movie 1')).toBeInTheDocument());
        expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });

    it('renders no movies message when bookmark is empty', async () => {
        mockUseUserContext.mockReturnValueOnce({
            userId: 'testUser',
            bookmark: [],
            setBookmark: jest.fn(),
            watchlist: [],
            setWatchlist: jest.fn(),
            fetchUserData: jest.fn(),
        });

        render(<BookMark />);

        await waitFor(() => expect(screen.getByText('No movies in your Favourties')).toBeInTheDocument());
    });

    it('removes movie from bookmark', async () => {
        const movies = [
            { id: '1', name: 'Movie 1', language: 'English', posterUrl: '/poster1.jpg' },
        ];
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: movies });
        (axios.delete as jest.Mock).mockResolvedValueOnce({ status: 200 });

        render(<BookMark />);

        await waitFor(() => expect(screen.getByText('Movie 1')).toBeInTheDocument());

        fireEvent.click(screen.getByText('Remove'));

        await waitFor(() => expect(mockUseUserContext().setBookmark).toHaveBeenCalledWith(['2']));
    });
});