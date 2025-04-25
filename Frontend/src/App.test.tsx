import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Navbar from './components/Navbar/NavBar';
import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies';
import Orders from './pages/Orders/Orders';
import Login from './pages/Login/Login';
import Signup from './pages/Register/Register';
import MovieBooking from './pages/MovieBooking/MovieBooking';
import ConfirmBooking from './pages/ConfirmBooking/ConfirmBooking';
import WatchlistPage from './pages/Watchlist/WatchList';
import BookMark from './pages/Bookmark/BookMark';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import AddMovieAdmin from './pages/Admin/AddMovie/AddMovieAdmin';
import UpdateMovieStatus from './pages/Admin/UpdateMovies/UpdateMovieStatus';
import DeleteMovieAdmin from './pages/Admin/DeleteMovie/DeleteMovieAdmin';
import TotalUsersAdmin from './pages/Admin/TotalUsers/TotalUsersAdmin';
import TopUsersAdmin from './pages/Admin/TopUsers/TopUsersAdmin';
import MostBookedMovies from './pages/Admin/TopMovies/MostBookedMovies';
import '@testing-library/jest-dom';
import { AuthProvider } from './context/Auth/AuthContext';
import { UserProvider } from './context/User/UserContext';

describe('App', () => {
    
    test('does not render Navbar on admin routes', () => {
        const { queryByText } = render(
            <MemoryRouter initialEntries={['/admin/login']}>
                <App />
            </MemoryRouter>
        );
        expect(queryByText('Navbar')).not.toBeInTheDocument();
    });

    test('renders Home component on root route', () => {
        const { getByText } = render(
            <UserProvider>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </UserProvider>
        );
        expect(getByText('Home')).toBeInTheDocument();
    });

    test('renders Movies component on /movies route', () => {
        const { getByText } = render(
            <UserProvider>
                <MemoryRouter initialEntries={['/movies']}>
                    <App />
                </MemoryRouter>
            </UserProvider>
        );
        expect(getByText('Movies')).toBeInTheDocument();
    });

    test('renders Login component on /login route', () => {
        const { getByText } = render(
            <UserProvider>
                <AuthProvider>
                    <MemoryRouter initialEntries={['/login']}>
                        <App />
                    </MemoryRouter>
                </AuthProvider>
            </UserProvider>
        );
        expect(getByText((content, element) => element.tagName.toLowerCase() === 'h2' && content === 'Login')).toBeInTheDocument();
    });

    test('renders AdminDashboard component on /admin/dashboard route', () => {
        const { getByText } = render(
            <UserProvider>
                <AuthProvider>
                    <MemoryRouter initialEntries={['/admin/dashboard']}>
                        <App />
                    </MemoryRouter>
                </AuthProvider>
            </UserProvider>
        );
    });
});