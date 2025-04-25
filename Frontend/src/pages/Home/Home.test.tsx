import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import { getAllMovies } from '../../utils/MovieService/movieService';
import '@testing-library/jest-dom';
import { UserProvider } from '../../context/User/UserContext'; // Adjust the import path as necessary

interface Movie {
  id: number;
  name: string;
  status: string;
}

jest.mock('../../utils/MovieService/movieService');
jest.mock('../../components/SearchBox/SearchBox', () => (props: { onSearch: (value: string) => void }) => (
  <input data-testid="search-box" onChange={(e) => props.onSearch(e.target.value)} />
));
jest.mock('../../components/FilterGrid/FilterGrid', () => ({ onFilterChange, onClearFilters }) => (
  <div>
    <button onClick={() => onFilterChange('language', 'English')}>Set Language Filter</button>
    <button onClick={() => onFilterChange('genre', 'Action')}>Set Genre Filter</button>
    <button onClick={onClearFilters}>Clear Filters</button>
  </div>
));
jest.mock('../../components/MovieCard/MovieCard', () => ({ movie }) => <div>{movie.name}</div>);

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches and displays movies based on filters', async () => {
    const mockMovies = [
      { id: 1, name: 'Movie 1', status: 'Running' },
      { id: 2, name: 'Movie 2', status: 'Running' },
    ];
  
    (getAllMovies as jest.Mock).mockResolvedValue(mockMovies);
  
    render(
      <UserProvider>
        <Home />
      </UserProvider>
    );
  
    fireEvent.click(screen.getByText('Set Language Filter'));
    fireEvent.click(screen.getByText('Set Genre Filter'));
  
    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });
  });
  

  test('filters movies based on search term', async () => {
    const mockMovies = [
      { id: 1, name: 'Movie 1', status: 'Running' },
      { id: 2, name: 'Action Movie', status: 'Running' },
    ];
    
    (getAllMovies as jest.Mock).mockResolvedValue(mockMovies);

    render(
      <UserProvider>
        <Home />
      </UserProvider>
    );

    fireEvent.change(screen.getByTestId('search-box'), { target: { value: 'Action' } });

    await waitFor(() => {
      expect(screen.getByText('Action Movie')).toBeInTheDocument();
      expect(screen.queryByText('Movie 1')).not.toBeInTheDocument(); 
    });
  });

  test('shows no movies found message if no movies match filters', async () => {
    const mockMovies: Movie[] = [];
  
    (getAllMovies as jest.Mock).mockResolvedValue(mockMovies);
  
    render(
      <UserProvider>
        <Home />
      </UserProvider>
    );
  
    await waitFor(() => {
      expect(screen.getByText('No movies match your search.')).toBeInTheDocument();
    });
  });

  test('clears filters when clear button is clicked', async () => {
    const mockMovies = [
      { id: 1, name: 'Movie 1', status: 'Running' },
      { id: 2, name: 'Movie 2', status: 'Running' },
    ];
    
    (getAllMovies as jest.Mock).mockResolvedValue(mockMovies);

    render(
      <UserProvider>
        <Home />
      </UserProvider>
    );
    fireEvent.click(screen.getByText('Set Language Filter'));
    fireEvent.click(screen.getByText('Set Genre Filter'));
    fireEvent.click(screen.getByText('Clear Filters'));
  });
});
