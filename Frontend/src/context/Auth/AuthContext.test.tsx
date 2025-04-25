import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuthContext } from './AuthContext';
import { useUserContext } from '../User/UserContext';

jest.mock('../User/UserContext');

const mockFetchUserData = jest.fn();
(useUserContext as jest.Mock).mockReturnValue({ fetchUserData: mockFetchUserData });

const TestComponent: React.FC = () => {
  const { isAuthenticated, login, logout, role } = useAuthContext();
  return (
    <div>
      <div data-testid="isAuthenticated">{isAuthenticated.toString()}</div>
      <div data-testid="role">{role}</div>
      <button onClick={() => login('token', 'userId', 'User')}>Login as User</button>
      <button onClick={() => login('adminToken', 'adminId', 'Admin')}>Login as Admin</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    mockFetchUserData.mockClear();
  });

  it('should initialize with isAuthenticated false and role null', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('false');
    expect(screen.getByTestId('role').textContent).toBe('');
  });

  it('should login as User', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    act(() => {
      screen.getByText('Login as User').click();
    });
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('true');
    expect(screen.getByTestId('role').textContent).toBe('User');
    expect(localStorage.getItem('token')).toBe('token');
    expect(localStorage.getItem('userId')).toBe('userId');
    expect(mockFetchUserData).toHaveBeenCalledWith('userId');
  });

  it('should login as Admin', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    act(() => {
      screen.getByText('Login as Admin').click();
    });
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('true');
    expect(screen.getByTestId('role').textContent).toBe('Admin');
    expect(localStorage.getItem('adminToken')).toBe('adminToken');
    expect(localStorage.getItem('adminId')).toBe('adminId');
  });

  it('should logout', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    act(() => {
      screen.getByText('Login as User').click();
    });
    act(() => {
      screen.getByText('Logout').click();
    });
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('false');
    expect(screen.getByTestId('role').textContent).toBe('');
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
    expect(localStorage.getItem('adminToken')).toBeNull();
    expect(localStorage.getItem('adminId')).toBeNull();
  });
});