import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import WatchlistPage from './WatchList';
import { useUserContext } from '../../context/User/UserContext';
import axios from 'axios';

jest.mock('axios');
jest.mock('../../context/User/UserContext');

const mockUseUserContext = useUserContext as jest.MockedFunction<typeof useUserContext>;

describe('WatchlistPage', () => {
  beforeEach(() => {
    mockUseUserContext.mockReturnValue({
      userId: '123',
      watchlist: ['1', '2'],
      setWatchlist: jest.fn(),
      bookmark: [],
      setBookmark: jest.fn(),
      fetchUserData: jest.fn(),
    });
  });

  test('renders loading state initially', () => {
    render(
      <MemoryRouter>
        <WatchlistPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders no movies message when watchlist is empty', async () => {
    
    mockUseUserContext.mockReturnValue({
      userId: '123',
      watchlist: ['1', '2'],
      setWatchlist: jest.fn(),
      bookmark: [],
      setBookmark: jest.fn(),
      fetchUserData: jest.fn(),
    });
    render(
      <MemoryRouter>
        <WatchlistPage />
      </MemoryRouter>
    );
    expect(await screen.findByText('No movies in your watchlist')).toBeInTheDocument();
  });

  test('renders movies when watchlist is not empty', async () => {
    const movies = [
      { id: '1', name: 'Movie 1', language: 'English', posterUrl: '/poster1.jpg' },
      { id: '2', name: 'Movie 2', language: 'Spanish', posterUrl: '/poster2.jpg' },
    ];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: movies });

    render(
      <MemoryRouter>
        <WatchlistPage />
      </MemoryRouter>
    );
    expect(await screen.findByText('Movie 1')).toBeInTheDocument();
    expect(await screen.findByText('Movie 2')).toBeInTheDocument();
  });

  test('removes movie from watchlist', async () => {
    const movies = [
      { id: '1', name: 'Movie 1', language: 'English', posterUrl: '/poster1.jpg' },
      { id: '2', name: 'Movie 2', language: 'Spanish', posterUrl: '/poster2.jpg' },
    ];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: movies });
    (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValueOnce({ status: 200 });

    const { getByText, findByText } = render(
      <MemoryRouter>
        <WatchlistPage />
      </MemoryRouter>
    );
    expect(await findByText('Movie 1')).toBeInTheDocument();

    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);
    expect(await findByText('Movie 2')).toBeInTheDocument();
  });
});