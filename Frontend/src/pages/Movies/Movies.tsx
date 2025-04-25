import React, { useState, useEffect } from 'react';
import SearchBox from '../../components/SearchBox/SearchBox';
import MovieCard from '../../components/MovieCard/MovieCard';
import { Movie } from '../../utils/MovieService/movieService'; 
import { NoMoviesFound, MovieList, HomeContainerMovies } from '../Commonstyles.styles'; 
import axios from 'axios';
import { useUserContext } from '../../context/User/UserContext';

const Movies: React.FC = () => {
   const { watchlist, bookmark } = useUserContext();
  const [movies, setMovies] = useState<Movie[]>([]); 
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [noMoviesMessage, setNoMoviesMessage] = useState(''); 

  // Fetch all movies on page load
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://localhost:7128/api/movie/ids`); 
        if (response.data == 0) {
          setNoMoviesMessage("No Movies Found"); 
          setMovies([]);
          setFilteredMovies([]); 
        } else {
          setMovies(response.data); 
          setFilteredMovies(response.data); 
          setNoMoviesMessage(''); 
        }
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const filtered = movies.filter((movie) =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered); 
  }, [searchTerm, movies]); 

  return (
    <HomeContainerMovies>
      <SearchBox onSearch={setSearchTerm} />

      {noMoviesMessage ? (
        <NoMoviesFound>{noMoviesMessage}</NoMoviesFound> 
      ) : (
        <MovieList>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={{ ...movie, isInWatchlist: watchlist.includes(movie.id), isInBookmark: bookmark.includes(movie.id) }} />
            ))
          ) : (
            <NoMoviesFound>No movies available.</NoMoviesFound>
          )}
        </MovieList>
      )}
    </HomeContainerMovies>
  );
};

export default Movies;
