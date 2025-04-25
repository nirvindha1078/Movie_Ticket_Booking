import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert, MovieBookedTitle, MovieCard, MovieDetails, MoviePoster, OuterDiv } from '../../Admin/TopMovies/TopMoviesStyles';


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
  bookingsCount: number;  
}

const MostBookedMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    
    if (!adminToken) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchMoviesAndBookings = async () => {
      try {
        const ordersResponse = await axios.get('https://localhost:7128/api/admin/AdminDashboard/orders', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });

        const allOrders = ordersResponse.data;

        const movieBookingCount: Record<string, number> = {};

        allOrders.forEach((order: { movieId: string }) => {
          const movieId = order.movieId;
          movieBookingCount[movieId] = (movieBookingCount[movieId] || 0) + 1;
        });

        const movieIds = Object.keys(movieBookingCount);
        const queryStringMovie = movieIds.map(id => `movieIds=${id}`).join('&');
        const urlMovie = `https://localhost:7128/api/movie/ids?${queryStringMovie}`;

        const movieDetailsResponse = await axios.get(urlMovie, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });

        const movieDetails = movieDetailsResponse.data;

        const moviesWithBookingCount = movieDetails.map((movie: any) => {
        const bookingsCount = movieBookingCount[movie.id];

          return {
            id: movie.id,
            name: movie.name,
            language: movie.language,
            format: movie.format,
            genre: movie.genre,
            posterUrl: movie.posterUrl,
            runTime: movie.runTime,
            rating: movie.rating,
            ticketPrice: movie.ticketPrice,
            status: movie.status,
            bookingsCount,  
          };
        });

        const sortedMovies = moviesWithBookingCount.sort(
          (a: { bookingsCount: number; }, b: { bookingsCount: number; }) => b.bookingsCount - a.bookingsCount
        );

        setMovies(sortedMovies);
      } catch (error) {
        //console.error('Error fetching movies and orders:', error);
      }
    };

    fetchMoviesAndBookings();
  }, []);

  return (
    <div>
        <MovieBookedTitle>Most Booked Movies</MovieBookedTitle>
        <OuterDiv>
      {successMessage && <Alert>{successMessage}</Alert>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {movies.map((movie) => (
          <MovieCard key={movie.id}>
            <MoviePoster src={movie.posterUrl} alt={movie.name} />
            <h3>{movie.name}</h3>
            <MovieDetails>
              <p><strong>Language:</strong> {movie.language}</p>
              <p><strong>Format:</strong> {movie.format}</p>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Runtime:</strong> {movie.runTime} mins</p>
              <p><strong>Bookings:</strong> {movie.bookingsCount}</p>
            </MovieDetails>
          </MovieCard>
        ))}
      </div>
      </OuterDiv>
    </div>
  );
};

export default MostBookedMovies;
