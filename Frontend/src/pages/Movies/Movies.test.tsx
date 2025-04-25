import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Movies from './Movies'; 
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../../context/User/UserContext';
import { AuthProvider } from '../../context/Auth/AuthContext';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Movies Component', () => {
  const mockMovies = [
    { id: 1, name: 'Movie 1' },
    { id: 2, name: 'Movie 2' },
  ];

  it('should fetch and display movies on load', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockMovies });

    render(
      <UserProvider>
          <AuthProvider>
          <BrowserRouter>
            <Movies />
          </BrowserRouter>
          </AuthProvider>
        </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByText((content, element) => element?.tagName.toLowerCase() === 'h3' && content.includes('Movie 1'))).toBeInTheDocument();
      expect(screen.getByText((content, element) => element?.tagName.toLowerCase() === 'h3' && content.includes('Movie 2'))).toBeInTheDocument();
    });
  });

  it('should display "No Movies Found" when no movies are fetched', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(
      
        <UserProvider>
          <AuthProvider>
          <BrowserRouter>
            <Movies />
          </BrowserRouter>
          </AuthProvider>
        </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('No Movies Found')).toBeInTheDocument();
    });
  });

  it('should filter movies based on search term', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockMovies });

    render(
      <UserProvider>
          <AuthProvider>
          <BrowserRouter>
            <Movies />
          </BrowserRouter>
          </AuthProvider>
        </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByText((content, element) => element?.tagName.toLowerCase() === 'h3' && content.includes('Movie 1'))).toBeInTheDocument();
      expect(screen.getByText((content, element) => element?.tagName.toLowerCase() === 'h3' && content.includes('Movie 2'))).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Movie 1' } });

    expect(screen.queryByText('Movie 2')).not.toBeInTheDocument();
    expect(screen.getByText((content, element) => element?.tagName.toLowerCase() === 'h3' && content.includes('Movie 1'))).toBeInTheDocument();
  });

  it('should display "No movies available." when search term does not match any movie', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockMovies });

    render(
      <UserProvider>
          <AuthProvider>
          <BrowserRouter>
            <Movies />
          </BrowserRouter>
          </AuthProvider>
        </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByText((content, element) => element?.tagName.toLowerCase() === 'h3' && content.includes('Movie 1'))).toBeInTheDocument();
      expect(screen.getByText((content, element) => element?.tagName.toLowerCase() === 'h3' && content.includes('Movie 2'))).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Nonexistent Movie' } });

    expect(screen.getByText('No movies available.')).toBeInTheDocument();
  });
});
