import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MovieCard, { MovieCardProps } from './MovieCard';
import { useUserContext } from '../../context/User/UserContext';
import { useAuthContext } from '../../context/Auth/AuthContext';
import '@testing-library/jest-dom';

jest.mock('../../context/User/UserContext');
jest.mock('../../context/Auth/AuthContext');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockMovie: MovieCardProps['movie'] = {
  id: '1',
  name: 'Test Movie',
  language: 'English',
  format: '2D',
  genre: 'Action',
  posterUrl: 'test-url',
  runTime: '120 min',
  rating: 4.5,
  status: 'Now Showing',
  isInWatchlist: false,
  isInBookmark: false,
};

describe('MovieCard', () => {
  beforeEach(() => {
    (useUserContext as jest.Mock).mockReturnValue({
      userId: '123',
      watchlist: [],
      bookmark: [],
      setWatchlist: jest.fn(),
      setBookmark: jest.fn(),
      fetchUserData: jest.fn(),
    });
    (useAuthContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
    });
  });

  it('renders movie details correctly', () => {
    render(
      <Router>
        <MovieCard movie={mockMovie} />
      </Router>
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('English | 2D | Action')).toBeInTheDocument();
  });

  it('navigates to booking page when "Book Ticket" button is clicked', () => {
    render(
      <Router>
        <MovieCard movie={mockMovie} />
      </Router>
    );

    fireEvent.click(screen.getByText('Book Ticket'));
    expect(mockNavigate).toHaveBeenCalledWith('/movie-booking/1', { state: { movieDetails: mockMovie } });
  });

  it('navigates to login page if not authenticated when "Book Ticket" button is clicked', () => {
    (useAuthContext as jest.Mock).mockReturnValue({
      isAuthenticated: false,
    });

    render(
      <Router>
        <MovieCard movie={mockMovie} />
      </Router>
    );

    fireEvent.click(screen.getByText('Book Ticket'));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('adds movie to watchlist when "Add to Watchlist" button is clicked', async () => {
    const setWatchlist = jest.fn();
    (useUserContext as jest.Mock).mockReturnValue({
      userId: '123',
      watchlist: [],
      bookmark: [],
      setWatchlist,
      setBookmark: jest.fn(),
      fetchUserData: jest.fn(),
    });

    render(
      <Router>
        <MovieCard movie={mockMovie} />
      </Router>
    );

    
  });

  it('adds movie to bookmark when "Add to Bookmark" button is clicked', async () => {
    const setBookmark = jest.fn();
    (useUserContext as jest.Mock).mockReturnValue({
      userId: '123',
      watchlist: [],
      bookmark: [],
      setWatchlist: jest.fn(),
      setBookmark,
      fetchUserData: jest.fn(),
    });

    render(
      <Router>
        <MovieCard movie={mockMovie} />
      </Router>
    );

  });
});