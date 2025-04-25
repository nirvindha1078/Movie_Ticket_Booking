import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from './SearchBox';  
import '@testing-library/jest-dom';

describe('SearchBox', () => {
  it('renders the search input field correctly', () => {
    render(<SearchBox onSearch={jest.fn()} />);

    const inputElement = screen.getByPlaceholderText('Search here.....');
    expect(inputElement).toBeInTheDocument();
  });

  it('calls onSearch with the correct value when the input changes', () => {
    const mockOnSearch = jest.fn(); 
    render(<SearchBox onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('Search here.....');

    fireEvent.change(inputElement, { target: { value: 'test' } });

    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  it('calls onSearch with an empty string when the input is cleared', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBox onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('Search here.....');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    fireEvent.change(inputElement, { target: { value: '' } }); 

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
