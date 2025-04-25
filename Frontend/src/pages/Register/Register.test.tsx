import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp from '../Register/Register';  
import { post } from '../../utils/Api/api'; 
import { useAuthContext } from '../../context/Auth/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom'; 

jest.mock('../../utils/Api/api', () => ({
  post: jest.fn(),
}));

jest.mock('../../context/Auth/AuthContext', () => ({
  useAuthContext: () => ({
    login: jest.fn(),
  }),
}));

describe('SignUp Component', () => {
  const mockLogin = jest.fn();
  beforeEach(() => {
    // Mock the context
    jest.spyOn(require('../../context/Auth/AuthContext'), 'useAuthContext').mockReturnValue({
      login: mockLogin,
    });
  });
    });

  test('shows validation errors on submit with empty fields', async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/Username is required/)).toBeInTheDocument();
      expect(screen.getByText(/Please enter a valid email address/)).toBeInTheDocument();
      expect(screen.getByText(/Phone number must be 10 digits/)).toBeInTheDocument();
      expect(screen.getByText(/Password must be at least 6 characters/)).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/User Name/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });

    (post as jest.Mock).mockResolvedValue({
      data: { token: 'fake-token', user: { id: '1', role: 'user' } },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(post).toHaveBeenCalledWith('/auth/register', {
        username: 'testuser',
        email: 'test@example.com',
        phoneNumber: '1234567890',
        password: 'password',
      });
    });
  });

  test('handles registration failure', async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    fireEvent.change(screen.getByLabelText(/User Name/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });

    (post as jest.Mock).mockRejectedValue(new Error('Failed to register'));

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
    });
  });
