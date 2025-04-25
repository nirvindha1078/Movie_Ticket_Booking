import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../utils/Api/api';
import { FormContainer, FormBox, FormField, Input, SubmitButton, ErrorTexts } from '../Commonstyles.styles';
import { useAuthContext } from '../../context/Auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = (): boolean => {
    let isValid = true;
    const newErrors = { username: '', email: '', phoneNumber: '', password: '' };

    if (!formData.username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
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
        const response = await post('/auth/register', formData);
        const { token, user } = response.data;
        login(token, user.id, user.role);
        navigate('/');
      } catch (error: any) {
        if (error.response) {
          console.error('Error during sign-up:', error.response.data);
          const errorMessage = error.response.data;
          toast.error(errorMessage); 
        } else if (error.request) {
          console.error('Error during sign-up (no response):', error.request);
          toast.error('No response from the server. Please check your internet connection.');
        } else {
          console.error('Error during sign-up:', error.message);
          toast.error(`Error: ${error.message || 'Something went wrong. Please try again.'}`);
        }
      }
    }
  };

  return (
    <FormContainer>
      <FormBox onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <FormField>
          <label htmlFor="username">User Name</label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            // required
          />
          {errors.username && <ErrorTexts>{errors.username}</ErrorTexts>}
        </FormField>

        <FormField>
          <label htmlFor="email">Email</label>
          <Input
            type="text"
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
          <label htmlFor="phoneNumber">Phone Number</label>
          <Input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            // required
          />
          {errors.phoneNumber && <ErrorTexts>{errors.phoneNumber}</ErrorTexts>}
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

        <SubmitButton type="submit">Sign Up</SubmitButton>
      </FormBox>

      <ToastContainer /> 
    </FormContainer>
  );
};

export default SignUp;
