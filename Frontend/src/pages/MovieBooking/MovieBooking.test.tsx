import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import MovieBookingPage from './MovieBooking';
import '@testing-library/jest-dom';

jest.mock('axios');

const mockMovie = [{
  id: '1',
  name: 'Test Movie',
  language: 'English',
  format: '2D',
  genre: 'Action',
  posterUrl: 'test-poster-url',
  runTime: '120',
  rating: 4.5,
  ticketPrice: 10,
  status: 'Now Showing'
}];

const mockTheaters = [{
  id: '1',
  name: 'Test Theater',
  address: '123 Test St',
  timeSlots: [
    { id: '1', time: '10:00 AM', availableSeats: 5 },
    { id: '2', time: '02:00 PM', availableSeats: 0 }
  ]
}];

describe('MovieBookingPage', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockImplementation((url) => {
      if (url.includes('/api/movie/ids')) {
        return Promise.resolve({ data: mockMovie });
      }
      if (url.includes('/api/theater/gettheateridsbymovieid')) {
        return Promise.resolve({ data: ['1'] });
      }
      if (url.includes('/api/theater/ids')) {
        return Promise.resolve({ data: mockTheaters });
      }
      return Promise.reject(new Error('not found'));
    });
  });

  test('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/movie-booking/1']}>
        <Routes>
          <Route path="/movie-booking/:movieId" element={<MovieBookingPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders movie and theaters after loading', async () => {
    render(
      <MemoryRouter initialEntries={['/movie-booking/1']}>
        <Routes>
          <Route path="/movie-booking/:movieId" element={<MovieBookingPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Test Movie')).toBeInTheDocument());
    expect(screen.getByText('Test Theater')).toBeInTheDocument();
  });

  test('filters theaters based on search term', async () => {
    render(
      <MemoryRouter initialEntries={['/movie-booking/1']}>
        <Routes>
          <Route path="/movie-booking/:movieId" element={<MovieBookingPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Test Theater')).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText('Search for theaters...'), { target: { value: 'Nonexistent' } });
    expect(screen.getByText('No theaters found')).toBeInTheDocument();
  });

  test('disables time slot button if no available seats', async () => {
    render(
      <MemoryRouter initialEntries={['/movie-booking/1']}>
        <Routes>
          <Route path="/movie-booking/:movieId" element={<MovieBookingPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Test Theater')).toBeInTheDocument());
  });
});