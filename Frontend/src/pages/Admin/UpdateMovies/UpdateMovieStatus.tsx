import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert, MovieCard, MoviePoster, OuterDiv, UpdateTitle, SelectStatus, UpdateButton } from './UpdateMovieStyled';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

interface Movie {
    id: string;
    name: string;
    language: string;
    format: string;
    genre: string;
    posterUrl: string;
    runTime: string;
    rating: number;
    ticketPrice: number;
    status: string;
}

const MovieUpdatePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    
    if (!adminToken) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://localhost:7128/api/movie/ids', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
        });
        setMovies(response.data); 
      } catch (error) {
        //console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleStatusChange = (movieId: string, status: string) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [movieId]: status,
    }));
  };

  const handleUpdateClick = async (movieId: string) => {
    const status = selectedStatus[movieId];
    if (!status) {
      toast.error('Please select a status!'); 
      return;
    }

    try {
      const response = await axios.put(
        `https://localhost:7128/api/admin/admindashboard/updatestatus/${movieId}?status=${status}`,
        null,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        }
      );

      if (response.status === 200) {
        toast.success('Movie status updated successfully!'); 
      }
    } catch (error) {
      //console.error('Error updating movie status:', error);
      toast.error('Failed to update movie status');  
    }
  };

  return (
    <OuterDiv>
      <UpdateTitle>Update the status</UpdateTitle>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id}>
            <MoviePoster src={movie.posterUrl} alt={movie.name} />
            <h3>{movie.name}</h3>
            <h4>{movie.language} | {movie.format} | {movie.genre}</h4>
            <SelectStatus
              value={selectedStatus[movie.id] || ''}
              onChange={(e) => handleStatusChange(movie.id, e.target.value)}
            >
              <option value={movie.status}>{movie.status}</option>
              {movie.status !== 'Upcoming' && (
                <option value="Upcoming">Upcoming</option>
              )}
              {movie.status !== 'Running' && (
                <option value="Running">Running</option>
              )}
            </SelectStatus>
            <UpdateButton onClick={() => handleUpdateClick(movie.id)}>
              Update Status
            </UpdateButton>
          </MovieCard>
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </OuterDiv>
  );
};

export default MovieUpdatePage;
