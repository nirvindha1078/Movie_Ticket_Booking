import { render } from '@testing-library/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/Auth/AuthContext';
import { UserProvider } from './context/User/UserContext';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
describe('Main Application', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);

        createRoot(div).render(
            <StrictMode>
                <AuthProvider>
                    <UserProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </UserProvider>
                </AuthProvider>
            </StrictMode>
        );

        document.body.removeChild(div);
    });

    it('renders App component', () => {
        const { getByText } = render(
            <StrictMode>
                <AuthProvider>
                    <UserProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </UserProvider>
                </AuthProvider>
            </StrictMode>,
            { wrapper: UserProvider }
        );

        expect(getByText(/No movies match your search./i)).toBeInTheDocument();
    });
});