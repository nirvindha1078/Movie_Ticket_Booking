import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../utils/Api/api';  
import { FormContainer, SignupButton, FormBox, FormField, Input, SubmitButton, ErrorTexts } from '../Commonstyles.styles';
import { useAuthContext } from '../../context/Auth/AuthContext'; 
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuthContext(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (): boolean => {
    let isValid = true;
    const newErrors = { email: '', password: '' };
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await post('/auth/login', formData);  
        const { token, user } = response.data;
        if (user.role === 'Admin') {
          login(token, user.id, user.role);  
          navigate('/admin/dashboard');
        } else {
          const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
          const decodedTokenExpiration = decodedToken.exp * 1000;
          localStorage.setItem('tokenExpiry', decodedTokenExpiration.toString());
          login(token, user.id, user.role);  
          navigate('/');  
        }
      } catch (error) {
        toast.error('Invalid credentials', {
          position: 'top-right', 
          autoClose: 5000,  
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <FormContainer>
      <FormBox onSubmit={handleSubmit}>
        <h2>Login</h2>

        <FormField>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            name="email"
            autoComplete="on"
            value={formData.email}
            onChange={handleChange}
            // required
          />
          {errors.email && <ErrorTexts>{errors.email}</ErrorTexts>}
        </FormField>

        <FormField>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            name="password"
            autoComplete="on"
            value={formData.password}
            onChange={handleChange}
            // required
          />
          {errors.password && <ErrorTexts>{errors.password}</ErrorTexts>}
        </FormField>

        <SubmitButton type="submit">Login</SubmitButton>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p>Don't have an account?</p>
          <SignupButton type="button" onClick={handleSignupRedirect} style={{ marginLeft: '8px' }}>
            Sign Up
          </SignupButton>
        </div>
      </FormBox>

      <ToastContainer 
        position="top-right" 
        autoClose={5000}     
        hideProgressBar={false}  
        closeOnClick={true}     
        pauseOnHover={true}    
        draggable={true}  
        theme="light"  
      />
    </FormContainer>
  );
};

export default Login;
