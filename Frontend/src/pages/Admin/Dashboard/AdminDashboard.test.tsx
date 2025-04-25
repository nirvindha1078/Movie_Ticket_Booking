import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import '@testing-library/jest-dom';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
}));

describe('AdminDashboard', () => {
    beforeEach(() => {
        localStorage.clear();
    });
    test('redirects to login if no admin token is found', () => {
        const navigate = mockedNavigate;
        render(
            <MemoryRouter initialEntries={['/admin']}>
                <AdminDashboard />
            </MemoryRouter>
        );
        expect(navigate).toHaveBeenCalledWith('/login');
    });

    test('renders the admin dashboard', () => {
        localStorage.setItem('adminToken', 'test-token');
        render(
            <MemoryRouter initialEntries={['/admin']}>
                <AdminDashboard />
            </MemoryRouter>
        );
        expect(screen.getByText('Welcome, Admin!')).toBeInTheDocument();
    });

    test('navigates to add movie page on card click', () => {
        localStorage.setItem('adminToken', 'test-token');
        const navigate = mockedNavigate;
        render(
            <MemoryRouter initialEntries={['/admin']}>
                <AdminDashboard />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText('Add Movie'));
        expect(navigate).toHaveBeenCalledWith('/admin/addmovie');
    });

    test('navigates to update movie status page on card click', () => {
        localStorage.setItem('adminToken', 'test-token');
        const navigate = mockedNavigate;
        render(
            <MemoryRouter initialEntries={['/admin']}>
                <AdminDashboard />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText('Update Movie Status'));
        expect(navigate).toHaveBeenCalledWith('/admin/updateMovie');
    });

    test('navigates to delete movie page on card click', () => {
        localStorage.setItem('adminToken', 'test-token');
        const navigate = mockedNavigate;
        render(
            <MemoryRouter initialEntries={['/admin']}>
                <AdminDashboard />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText('Delete Movie'));
        expect(navigate).toHaveBeenCalledWith('/admin/deleteMovie');
    });

    test('navigates to view users page on card click', () => {
        localStorage.setItem('adminToken', 'test-token');
        const navigate = mockedNavigate;
        render(
            <MemoryRouter initialEntries={['/admin']}>
                <AdminDashboard />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText('View Total Users'));
        expect(navigate).toHaveBeenCalledWith('/admin/viewUsers');
    });

    test('navigates to top users page on card click', () => {
        localStorage.setItem('adminToken', 'test-token');
        const navigate = mockedNavigate;
        render(
            <MemoryRouter initialEntries={['/admin']}>
                <AdminDashboard />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText('View Top Users'));
        expect(navigate).toHaveBeenCalledWith('/admin/topUsers');
    });

    test('navigates to top movies page on card click', () => {
        localStorage.setItem('adminToken', 'test-token');
        const navigate = mockedNavigate;
        render(
            <MemoryRouter initialEntries={['/admin']}>
                <AdminDashboard />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText('View Most Booked Movies'));
        expect(navigate).toHaveBeenCalledWith('/admin/topMovies');
    });
});