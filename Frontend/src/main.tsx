import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/Auth/AuthContext'; 
import { UserProvider } from './context/User/UserContext';
import { BrowserRouter } from 'react-router-dom'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <AuthProvider> 
        <BrowserRouter> 
          <App />
        </BrowserRouter>
      </AuthProvider>
    </UserProvider>
  </StrictMode>,
);
