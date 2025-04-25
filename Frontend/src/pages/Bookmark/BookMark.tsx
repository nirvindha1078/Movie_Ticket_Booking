import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../context/User/UserContext';
import axios from 'axios';
import {
  MovieCardContainer1,
  MovieName1,
  MovieLanguage1,
  RemoveButton,
  MovieCard1,
  MoviePosterWatchlist,
  FeatureContainer1,
  Favourties,
  MovieStatus,
  NoContainer
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

const BookMark: React.FC = () => {
  const { userId, bookmark, setBookmark } = useUserContext();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMovieDetails = async () => {
    if (bookmark.length > 0) {
      const queryStringMovie = bookmark.map((item) => `movieIds=${item}`).join('&'); 
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
  }, [userId, bookmark]);

  const handleRemoveFromBookmark = async (movieId: string) => {
    if (userId) {
      try {
        const response = await axios.delete(
          `https://localhost:7128/api/bookmark?movieId=${movieId}&userId=${userId}`
        );
        if (response.status === 200) {
          const updatedBookmark = bookmark.filter((id) => id !== movieId); 
          setBookmark(updatedBookmark);
          const updatedMovies = movies.filter((movie) => movie.id !== movieId);
          setMovies(updatedMovies); 
        }
      } catch (error) {
        //console.error('Error removing from bookmark', error);
      }
    }
  };

  if (loading) {
    return <div style={{textAlign:'center', fontSize:"18px"}}>Loading...</div>;
  }

  return (
    <FeatureContainer1>
    <Favourties>Your Favourties</Favourties>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', paddingRight: '10px'}}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard1 key={movie.id}>
              <MovieCardContainer1>
                <MoviePosterWatchlist
                  src={movie.posterUrl}
                  alt={movie.name}
                />
                <MovieName1>{movie.name}</MovieName1>
                <MovieLanguage1>{movie.language} | {movie.format} | {movie.genre}</MovieLanguage1>
                <MovieStatus><strong>Status: </strong>{movie.status}</MovieStatus>
                <RemoveButton onClick={() => handleRemoveFromBookmark(movie.id)}>
                  Remove
                </RemoveButton>
              </MovieCardContainer1>
            </MovieCard1>
          ))
        ) : (
          <NoContainer>
          <div>No movies in your Favourties</div>
          </NoContainer>
        )}
      </div>
    </FeatureContainer1>
  );
};

export default BookMark;
