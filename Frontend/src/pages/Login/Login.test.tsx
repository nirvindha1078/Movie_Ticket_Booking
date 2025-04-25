import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext';
import Login from './Login';
import { post } from '../../utils/Api/api';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom';

jest.mock('../../utils/Api/api');
jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
    ToastContainer: () => <div />,
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const mockLogin = jest.fn().mockResolvedValue(true);

const renderComponent = () => {
    render(
        <AuthContext.Provider value={{ login: mockLogin, isAuthenticated: false, logout: jest.fn(), role: 'User' }}>
            <Router>
                <Login />
            </Router>
        </AuthContext.Provider>
    );
};

describe('Login Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders login form', () => {
        renderComponent();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getAllByText(/login/i).length).toBeGreaterThan(0);
    });

    test('shows validation error for invalid email', async () => {
        renderComponent();
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.submit(screen.getByRole('button', { name: /login/i }));
        expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
    });

    test('submits form with valid data', async () => {
        (post as jest.Mock).mockResolvedValue({
            data: {
                token: 'mockToken',
                user: { id: '1', name: 'John Doe', email: 'john@example.com', role: 'User' },
            },
        });

        renderComponent();
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getAllByText(/login/i)[1]);
    });

    test('shows error toast on invalid credentials', async () => {
        (post as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

        renderComponent();
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getAllByText(/login/i)[1]);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Invalid credentials', expect.any(Object));
        });
    });

    test('redirects to signup page on signup button click', () => {
        renderComponent();
        fireEvent.click(screen.getByText(/sign up/i));
        expect(mockNavigate).toHaveBeenCalledWith('/signup');
    });
});