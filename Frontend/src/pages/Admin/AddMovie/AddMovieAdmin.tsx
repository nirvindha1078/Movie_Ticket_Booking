import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { AddMovieWrapper, AddMovieTitle, Label1, InputField, SelectField, FileInput, SubmitButton, CheckboxWrapper, CheckboxLabel } from '../AddMovie/AddMovieStyles';

interface MovieDto {
  Name: string;
  Language: string;
  Format: string;
  Genre: string;
  RunTime: string;
  Rating: number;
  TicketPrice: string;
  Status: string;
  ImageFile: File | null;
  SelectedTheaters: string[];
}

const AddMovieAdmin = () => {
  const [theaters, setTheaters] = useState<{ id: string, name: string, address: string }[]>([]);
  const [movieData, setMovieData] = useState<MovieDto>({
    Name: '',
    Language: '',
    Format: '',
    Genre: '',
    RunTime: '',
    Rating: 0,
    TicketPrice: '',
    Status: '',
    ImageFile: null,
    SelectedTheaters: [],
  });
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/login');
    }

    const fetchTheaters = async () => {
      try {
        const response = await axios.get('https://localhost:7128/api/theater/ids');
        setTheaters(response.data);
      } catch (error) {
        console.error('Error fetching theaters:', error);
      }
    };

    fetchTheaters();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',  
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieData((prevData) => ({
      ...prevData,
      ImageFile: e.target.files ? e.target.files[0] : null,
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      ImageFile: '',  
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setMovieData((prevData) => {
      let updatedTheaters = [...prevData.SelectedTheaters];
      if (checked) {
        updatedTheaters.push(value);
      } else {
        updatedTheaters = updatedTheaters.filter((id) => id !== value);
      }
      return { ...prevData, SelectedTheaters: updatedTheaters };
    });
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    let isValid = true;

    if (!movieData.Name) {
      errors.Name = 'Movie Name is required';
      isValid = false;
    }
    if (!movieData.Language) {
      errors.Language = 'Language is required';
      isValid = false;
    }
    if (!movieData.Format) {
      errors.Format = 'Format is required';
      isValid = false;
    }
    if (!movieData.Genre) {
      errors.Genre = 'Genre is required';
      isValid = false;
    }
    if (!movieData.RunTime) {
      errors.RunTime = 'RunTime is required';
      isValid = false;
    } else if (!/^\d{3}$/.test(movieData.RunTime)) {
      errors.RunTime = 'RunTime should be a 3-digit number';
      isValid = false;
    }
    if (movieData.Rating <= 0 || movieData.Rating > 5.0 || isNaN(movieData.Rating)) {
      errors.Rating = 'Rating should be a decimal number between 0 and 5';
      isValid = false;
    }
    if(!movieData.TicketPrice) {
      errors.TicketPrice = 'TicketPrice is required';
      isValid = false;
    }
    if (isNaN(Number(movieData.TicketPrice))) {
      errors.TicketPrice = 'TicketPrice must be a valid number';
      isValid = false;
    } 
    if(!movieData.Status) {
      errors.Status = 'Status is required';
      isValid = false;
    }
    if (!movieData.ImageFile) {
      errors.ImageFile = 'Image file is required';
      isValid = false;
    }
    if (movieData.SelectedTheaters.length === 0) {
      errors.SelectedTheaters = 'At least one theater must be selected';
      isValid = false;
    }

    setValidationErrors(errors); 
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('Name', movieData.Name);
    formData.append('Language', movieData.Language);
    formData.append('Format', movieData.Format);
    formData.append('Genre', movieData.Genre);
    formData.append('RunTime', movieData.RunTime);
    formData.append('Rating', movieData.Rating.toString());
    formData.append('TicketPrice', movieData.TicketPrice);
    formData.append('Status', movieData.Status);
    if (movieData.ImageFile) formData.append('ImageFile', movieData.ImageFile);

    try {
      const token = localStorage.getItem('adminToken');
      const MovieResponse = await axios.post('https://localhost:7128/api/admin/admindashboard', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMovieData({
        Name: '',
        Language: '',
        Format: '',
        Genre: '',
        RunTime: '',
        Rating: 0,
        TicketPrice: '',
        Status: '',
        ImageFile: null, 
        SelectedTheaters: [],
      });

      setValidationErrors({});
      
      const token1 = localStorage.getItem('adminToken');
      await Promise.all(
        movieData.SelectedTheaters.map(async (theaterId) => {
          await axios.patch(`https://localhost:7128/api/admin/admindashboard/addmovietotheater?theaterId=${theaterId}&movieId=${MovieResponse.data.id}`, null, {
            headers: {
              Authorization: `Bearer ${token1}`,
            },
          });
        })
      );

      toast.success('Movie added successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      toast.error('Error adding movie.');
      //console.error('Error:', error);
    }
  };

  return (
    <AddMovieWrapper>
      <AddMovieTitle>Add Movie</AddMovieTitle>
      <form onSubmit={handleSubmit}>
        <div>
          <Label1 htmlFor="Name">Movie Name</Label1>
          <InputField
            id="Name"
            name="Name"
            type="text"
            placeholder="Movie Name"
            value={movieData.Name}
            onChange={handleInputChange}
          />
          {validationErrors.Name && <div style={{ color: 'red' }}>{validationErrors.Name}</div>}
        </div>

        <div>
          <Label1 htmlFor="Language">Language</Label1>
          <SelectField
            id="Language"
            name="Language"
            value={movieData.Language}
            onChange={handleInputChange}
          >
            <option value="">Select Language</option>
            <option value="Tamil">Tamil</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
          </SelectField>
          {validationErrors.Language && <div style={{ color: 'red' }}>{validationErrors.Language}</div>}
        </div>

        <div>
          <Label1 htmlFor="Format">Format</Label1>
          <SelectField
            id="Format"
            name="Format"
            value={movieData.Format}
            onChange={handleInputChange}
          >
            <option value="">Select Format</option>
            <option value="2D">2D</option>
            <option value="3D">3D</option>
          </SelectField>
          {validationErrors.Format && <div style={{ color: 'red' }}>{validationErrors.Format}</div>}
        </div>

        <div>
          <Label1 htmlFor="Genre">Genre</Label1>
          <SelectField
            id="Genre"
            name="Genre"
            value={movieData.Genre}
            onChange={handleInputChange}
          >
            <option value="">Select Genre</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
          </SelectField>
          {validationErrors.Genre && <div style={{ color: 'red' }}>{validationErrors.Genre}</div>}
        </div>

        <div>
          <Label1 htmlFor="RunTime">RunTime</Label1>
          <InputField
            id="RunTime"
            name="RunTime"
            type="text"
            placeholder="RunTime (3 digits)"
            value={movieData.RunTime}
            onChange={handleInputChange}
          />
          {validationErrors.RunTime && <div style={{ color: 'red' }}>{validationErrors.RunTime}</div>}
        </div>

        <div>
          <Label1 htmlFor="Rating">Rating (Max 5.0)</Label1>
          <InputField
            id="Rating"
            name="Rating"
            type="number"
            step="0.1"
            max="5.0"
            min="0.0"
            value={movieData.Rating}
            onChange={handleInputChange}
          />
          {validationErrors.Rating && <div style={{ color: 'red' }}>{validationErrors.Rating}</div>}
        </div>

        <div>
          <Label1 htmlFor="TicketPrice">Ticket Price</Label1>
          <InputField
            id="TicketPrice"
            name="TicketPrice"
            type="text"
            placeholder="Ticket Price"
            value={movieData.TicketPrice}
            onChange={handleInputChange}
          />
          {validationErrors.TicketPrice && <div style={{ color: 'red' }}>{validationErrors.TicketPrice}</div>}
        </div>

        <div>
          <Label1 htmlFor="Status">Status</Label1>
          <SelectField
            id="Status"
            name="Status"
            value={movieData.Status}
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Running">Running</option>
          </SelectField>
          {validationErrors.Status && <div style={{ color: 'red' }}>{validationErrors.Status}</div>}
        </div>

        <div>
          <Label1 htmlFor="ImageFile">Image</Label1>
          <FileInput
            id="ImageFile"
            name="ImageFile"
            type="file"
            onChange={handleFileChange}
          />
          {validationErrors.ImageFile && <div style={{ color: 'red' }}>{validationErrors.ImageFile}</div>}
        </div>

        <div>
          <Label1>Select Theaters</Label1>
          <CheckboxWrapper>
            {theaters.map((theater) => (
              <div key={theater.id}>
                <input
                  type="checkbox"
                  id={`theater-${theater.id}`}
                  value={theater.id}
                  checked={movieData.SelectedTheaters.includes(theater.id)}
                  onChange={handleCheckboxChange}
                />
                <CheckboxLabel htmlFor={`theater-${theater.id}`}>{theater.name},{theater.address}</CheckboxLabel>
              </div>
            ))}
          </CheckboxWrapper>
          {validationErrors.SelectedTheaters && <div style={{ color: 'red' }}>{validationErrors.SelectedTheaters}</div>}
        </div>

        <SubmitButton type="submit">Add Movie</SubmitButton>
      </form>

      <ToastContainer />
    </AddMovieWrapper>
  );
};

export default AddMovieAdmin;
