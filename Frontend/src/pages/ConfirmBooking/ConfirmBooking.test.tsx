import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ConfirmBooking from './ConfirmBooking';
import '@testing-library/jest-dom';

const mockLocationState = {
    state: {
        movieId: '1',
        movieName: 'Test Movie',
        theaterName: 'Test Theater',
        theaterAddress: '123 Test St',
        timeSlot: '18:00',
        ticketPrice: 100,
        availableSeats: 10,
        theaterId: '1',
        movieLanguage: 'English',
        movieFormat: '2D',
        movieGenre: 'Action',
        moviePoster: '/test.jpg',
        movieRuntime: 120,
        movieRating: 4.5,
    },
};

jest.mock('axios');

describe('ConfirmBooking', () => {
    test('renders ConfirmBooking component', () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/confirm-booking', state: mockLocationState.state }]}>
                <Routes>
                    <Route path="/confirm-booking" element={<ConfirmBooking />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Test Movie')).toBeInTheDocument();
        expect(screen.getByText('Test Theater')).toBeInTheDocument();
        expect(screen.getByText('Rs.100')).toBeInTheDocument();
    });

    test('handles seat change', () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/confirm-booking', state: mockLocationState.state }]}>
                <Routes>
                    <Route path="/confirm-booking" element={<ConfirmBooking />} />
                </Routes>
            </MemoryRouter>
        );

        const incrementButton = screen.getByText('+');
        fireEvent.click(incrementButton);
        expect(screen.getByText('1')).toBeInTheDocument();

        const decrementButton = screen.getByText('-');
        fireEvent.click(decrementButton);
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    test('displays error message when booking is invalid', () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/confirm-booking', state: mockLocationState.state }]}>
                <Routes>
                    <Route path="/confirm-booking" element={<ConfirmBooking />} />
                </Routes>
            </MemoryRouter>
        );

        const confirmButton = screen.getByText('Confirm Booking');
        fireEvent.click(confirmButton);

        expect(screen.getByText('Please select the number of seats.')).toBeInTheDocument();
    });
});