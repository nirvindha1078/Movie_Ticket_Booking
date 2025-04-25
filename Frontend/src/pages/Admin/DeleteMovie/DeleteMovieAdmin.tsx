import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MovieCard, MoviePoster, OuterDiv } from '../UpdateMovies/UpdateMovieStyled';
import { MovieDetails1, RemoveButton, DeleteTitle, ModalOverlay, ModalContainer, ModalButton } from '../DeleteMovie/DeleteMovieStyles';
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

const ConfirmationModal = ({ onClose, onConfirm }: { onClose: () => void, onConfirm: () => void }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <h2>Are you sure you want to delete this movie?</h2>
        <div>
          <ModalButton onClick={onConfirm}>Yes</ModalButton>
          <ModalButton onClick={onClose}>No</ModalButton>
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
};

const DeleteMovieAdmin = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);  
  const [selectedMovieId, setSelectedMovieId] = useState<string>('');
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
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMovies(response.data);
      } catch (error) {
      }
    };

    fetchMovies();
  }, []);

  const handleRemoveClick = (movieId: string) => {
    setSelectedMovieId(movieId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovieId('');
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`https://localhost:7128/api/admin/admindashboard/movie/${selectedMovieId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (response.status === 204) {
        setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== selectedMovieId));
        toast.success('Movie removed successfully!');  
      }
    } catch (error) {
      toast.error('Failed to remove movie. Please try again later.');  
    }

    setShowModal(false);
    setSelectedMovieId('');
  };

  return (
    <OuterDiv>
      <DeleteTitle>Movie List</DeleteTitle>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id}>
            <MoviePoster src={movie.posterUrl} alt={movie.name} />
            <h3>{movie.name}</h3>
            <MovieDetails1>
              <p><strong>Language:</strong> {movie.language}</p>
              <p><strong>Runtime:</strong> {movie.runTime} mins</p>
              <p><strong>Rating:</strong> {movie.rating}/5</p>
            </MovieDetails1>
            <RemoveButton onClick={() => handleRemoveClick(movie.id)}>
              Remove Movie
            </RemoveButton>
          </MovieCard>
        ))}
      </div>

      {showModal && (
        <ConfirmationModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </OuterDiv>
  );
};

export default DeleteMovieAdmin;
