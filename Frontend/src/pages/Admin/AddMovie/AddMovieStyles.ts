import styled from 'styled-components';

export const AddMovieWrapper = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 20px;
  background-color:rgb(190, 207, 206);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  margin-left: 42%;
`;

export const AddMovieTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
  margin-left: 35%;
`;

interface AlertProps {
  type: 'error' | 'success';
}

export const Alert = styled.div<AlertProps>`
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: ${(props) => (props.type === 'error' ? '#f8d7da' : '#d4edda')};
  color: ${(props) => (props.type === 'error' ? '#721c24' : '#155724')};
  border: ${(props) => (props.type === 'error' ? '1px solid #f5c6cb' : '1px solid #c3e6cb')};
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
`;

export const Label1 = styled.label`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 8px;
  display: block;
  color: #333;
  margin-top:15px;
`;

export const InputField = styled.input`
  width: 75%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

export const SelectField = styled.select`
  width: 78%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

export const ErrorMessage = styled.span`
  font-size: 0.9rem;
  color: #dc3545;
  margin-top: 5px;
  display: block;
`;

export const FileInput = styled.input`
  width: 75%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid none;
  border-radius: 5px;
  margin-bottom: 5px;
  outline: none;
  display: block;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  background-color: #28a745;
  color: #fff;
  font-size: 1.1rem;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 50%;
  margin-left: 25%;
  margin-top: 30px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #218838;
  }
`;

export const CheckboxWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const CheckboxLabel = styled.label`
  font-size: 1rem;
  margin-bottom: 10px;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  
  input {
    margin-right: 10px;
  }
`;
