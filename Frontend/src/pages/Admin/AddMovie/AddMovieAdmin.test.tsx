import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import AddMovieAdmin from './AddMovieAdmin';
import '@testing-library/jest-dom';
jest.mock('axios');
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
    ToastContainer: () => <div />,
}));

describe('AddMovieAdmin', () => {
    beforeEach(() => {
        localStorage.setItem('adminToken', 'test-token');
        (axios.get as jest.Mock).mockResolvedValue({ data: [{ id: '1', name: 'Theater 1', address: 'Address 1' }] });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders AddMovieAdmin component', async () => {
        render(
            <Router>
                <AddMovieAdmin />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getAllByText('Add Movie')[0]).toBeInTheDocument();
        });
    });

    test('validates form inputs', async () => {
        render(
            <Router>
                <AddMovieAdmin />
            </Router>
        );

        fireEvent.click(screen.getAllByText('Add Movie')[1]);

        await waitFor(() => {
            expect(screen.getByText('Movie Name is required')).toBeInTheDocument();
            expect(screen.getByText('Language is required')).toBeInTheDocument();
            expect(screen.getByText('Format is required')).toBeInTheDocument();
            expect(screen.getByText('Genre is required')).toBeInTheDocument();
            expect(screen.getByText('RunTime is required')).toBeInTheDocument();
            expect(screen.getByText('Rating should be a decimal number between 0 and 5')).toBeInTheDocument();
            expect(screen.getByText('TicketPrice is required')).toBeInTheDocument();
            expect(screen.getByText('Status is required')).toBeInTheDocument();
            expect(screen.getByText('Image file is required')).toBeInTheDocument();
            expect(screen.getByText('At least one theater must be selected')).toBeInTheDocument();
        });
    });

    test('submits form successfully', async () => {
        (axios.post as jest.Mock).mockResolvedValue({ data: { id: '1' } });
        (axios.patch as jest.Mock).mockResolvedValue({});

        render(
            <Router>
                <AddMovieAdmin />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Movie Name'), { target: { value: 'Test Movie' } });
        fireEvent.change(screen.getByLabelText('Language'), { target: { value: 'English' } });
        fireEvent.change(screen.getByLabelText('Format'), { target: { value: '2D' } });
        fireEvent.change(screen.getByLabelText('Genre'), { target: { value: 'Action' } });
        fireEvent.change(screen.getByPlaceholderText('RunTime (3 digits)'), { target: { value: '120' } });
        fireEvent.change(screen.getByLabelText('Rating (Max 5.0)'), { target: { value: '4.5' } });
        fireEvent.change(screen.getByPlaceholderText('Ticket Price'), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'Upcoming' } });
        fireEvent.change(screen.getByLabelText('Image'), { target: { files: [new File([''], 'test.png', { type: 'image/png' })] } });

        fireEvent.submit(screen.getByRole('button', { name: /Add Movie/i }).closest('form')!);
    });

    test('handles form submission error', async () => {
        (axios.post as jest.Mock).mockRejectedValue(new Error('Error adding movie'));

        render(
            <Router>
                <AddMovieAdmin />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Movie Name'), { target: { value: 'Test Movie' } });
        fireEvent.change(screen.getByLabelText('Language'), { target: { value: 'English' } });
        fireEvent.change(screen.getByLabelText('Format'), { target: { value: '2D' } });
        fireEvent.change(screen.getByLabelText('Genre'), { target: { value: 'Action' } });
        fireEvent.change(screen.getByPlaceholderText('RunTime (3 digits)'), { target: { value: '120' } });
        fireEvent.change(screen.getByLabelText('Rating (Max 5.0)'), { target: { value: '4.5' } });
        fireEvent.change(screen.getByPlaceholderText('Ticket Price'), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'Upcoming' } });
        fireEvent.change(screen.getByLabelText('Image'), { target: { files: [new File([''], 'test.png', { type: 'image/png' })] } });

        fireEvent.submit(screen.getByRole('button', { name: /Add Movie/i }).closest('form')!);
    });
});