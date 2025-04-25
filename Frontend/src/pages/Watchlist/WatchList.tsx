import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/User/UserContext';
import axios from 'axios';
import {
  MovieCardContainer2,
  MovieName1,
  MovieLanguage1,
  RemoveButton,
  MovieCard,
  MoviePosterWatchlist,
  FeatureContainer,
  Watchlist,BookButton1,
  MovieStatus
} from '../Commonstyles.styles';

interface Movie {
  id: string;
  name: string;
  language: string;
  format: string;
  genre: string;
  posterUrl: string;
  runTime: string;
  rating: number;
  status:string;
}
 const WatchlistPage :React.FC=()=>{
  const { userId, watchlist, setWatchlist } = useUserContext();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchMovieDetails = async () => {
    if (watchlist.length > 0) {
      const queryStringMovie = watchlist.map((item) => `movieIds=${item}`).join('&'); 
      const urlMovie = `https://localhost:7128/api/movie/ids?${queryStringMovie}`; 
      try {
        const movieDetails = await axios.get(urlMovie);
        setMovies(movieDetails.data);
      } catch (error) {
        //console.error('Error fetching movie details', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMovieDetails();
    }
  }, [userId, watchlist]);

  const isUpcoming = (movie: Movie) => movie.status === 'Upcoming';

  const handleBookTicket = (movie: Movie) => {
      navigate(`/movie-booking/${movie.id}`, { state: { movieDetails: movie } });
  };

  const handleRemoveFromWatchlist = async (movieId: string) => {
    if (userId) {
      try {
        const response = await axios.delete(
          `https://localhost:7128/api/watchlist?movieId=${movieId}&userId=${userId}`
        );
        if (response.status === 200) {
          const updatedWatchlist = watchlist.filter((id) => id !== movieId); 
          setWatchlist(updatedWatchlist);
          const updatedMovies = movies.filter((movie) => movie.id !== movieId);
          setMovies(updatedMovies); 
        }
      } catch (error) {
        //console.error('Error removing from watchlist', error);
      }
    }
  };

  if (loading) {
    return <div style={{textAlign:'center', fontSize:"18px"}}>Loading...</div>;
  }

  return (
    <FeatureContainer>
      <Watchlist>Your Watchlist</Watchlist>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id}>
              <MovieCardContainer2>
                <MoviePosterWatchlist
                  src={movie.posterUrl}
                  alt={movie.name}
                />
                <MovieName1>{movie.name}</MovieName1>
                <MovieLanguage1>{movie.language} | {movie.format} | {movie.genre}</MovieLanguage1>
                <MovieStatus><strong>Status: </strong>{movie.status}</MovieStatus>
                <BookButton1 onClick={() => handleBookTicket(movie)} disabled={isUpcoming(movie)}>Book Ticket</BookButton1><br></br>
                <RemoveButton onClick={() => handleRemoveFromWatchlist(movie.id)}>
                  Remove
                </RemoveButton>
              </MovieCardContainer2>
            </MovieCard>
          ))
        ) : (
          <div style={{textAlign:'center', fontSize:"18px"}}>No movies in your watchlist</div>
        )}
      </div>
    </FeatureContainer>
  );
};

export default WatchlistPage;
