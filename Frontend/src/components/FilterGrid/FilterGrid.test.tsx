import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FilterGrid from './FilterGrid'; 

describe('FilterGrid Component', () => {
  const mockOnFilterChange = jest.fn();
  const mockOnClearFilters = jest.fn();

  const initialFilters = {
    language: 'English',
    format: '2D',
    genre: 'Action',
  };

  beforeEach(() => {
    jest.clearAllMocks();  
  });

  test('renders correctly with initial filter values', () => {
    render(
      <FilterGrid
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
        filters={initialFilters}
      />
    );
    expect(screen.getByLabelText('English')).toBeTruthy();
    expect(screen.getByLabelText('2D')).toBeTruthy();
    expect(screen.getByLabelText('Action')).toBeTruthy();
  });

  test('calls onFilterChange when a radio button is selected', () => {
    render(
      <FilterGrid
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
        filters={initialFilters}
      />
    );

    fireEvent.click(screen.getByLabelText('Hindi'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('language', 'Hindi');

    fireEvent.click(screen.getByLabelText('3D'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('format', '3D');

    fireEvent.click(screen.getByLabelText('Comedy'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('genre', 'Comedy');
  });

  test('calls onClearFilters when the Clear Filters button is clicked', () => {
    render(
      <FilterGrid
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
        filters={initialFilters}
      />
    );

    fireEvent.click(screen.getByText('Clear Filters'));
    expect(mockOnClearFilters).toHaveBeenCalled();
  });
});
