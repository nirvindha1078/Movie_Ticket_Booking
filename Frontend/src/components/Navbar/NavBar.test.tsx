import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext';
import Navbar from './NavBar';
import '@testing-library/jest-dom';

describe('Navbar', () => {
    const renderNavbar = (isAuthenticated: boolean, logout: jest.Mock) => {
        render(
            <AuthContext.Provider value={{ isAuthenticated, login: jest.fn(), logout, role: null }}>
                <Router>
                    <Navbar />
                </Router>
            </AuthContext.Provider>
        );
    };

    test('renders logo', () => {
        renderNavbar(false, jest.fn());
        const logo = screen.getByAltText('Logo');
        expect(logo).toBeInTheDocument();
    });

    test('renders Home link', () => {
        renderNavbar(false, jest.fn());
        const homeLink = screen.getByText('Home');
        expect(homeLink).toBeInTheDocument();
    });

    test('renders Movies link', () => {
        renderNavbar(false, jest.fn());
        const moviesLink = screen.getByText('Movies');
        expect(moviesLink).toBeInTheDocument();
    });

    test('renders Login and Sign Up links when not authenticated', () => {
        renderNavbar(false, jest.fn());
        const loginLink = screen.getByText('Login');
        const signUpLink = screen.getByText('Sign Up');
        expect(loginLink).toBeInTheDocument();
        expect(signUpLink).toBeInTheDocument();
    });

    test('renders Logout button when authenticated', () => {
        renderNavbar(true, jest.fn());
        const logoutButton = screen.getByText('Logout');
        expect(logoutButton).toBeInTheDocument();
    });

    test('calls logout function on Logout button click', () => {
        const logoutMock = jest.fn();
        renderNavbar(true, logoutMock);
        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);
        expect(logoutMock).toHaveBeenCalled();
    });

    test('navigates to login page when trying to access protected routes while not authenticated', () => {
        const { container } = render(
            <AuthContext.Provider value={{ isAuthenticated: false, login: jest.fn(), logout: jest.fn(), role: null }}>
                <Router>
                    <Navbar />
                </Router>
            </AuthContext.Provider>
        );
        const bookmarkLink = container.querySelector('a[href="/bookmark"]');
        fireEvent.click(bookmarkLink!);
        expect(window.location.pathname).toBe('/login');
    });
});