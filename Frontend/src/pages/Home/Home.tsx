import React, { useState, useEffect } from 'react';
import SearchBox from '../../components/SearchBox/SearchBox';
import FilterGrid from '../../components/FilterGrid/FilterGrid';
import MovieCard from '../../components/MovieCard/MovieCard';
import { HomeContainer, LeftSection, RightSection1, NoMoviesFound, MovieList,PorjTitle} from '../Commonstyles.styles';
import { getAllMovies, Movie } from '../../utils/MovieService/movieService'; 
import { useUserContext } from '../../context/User/UserContext';

const Home: React.FC = () => {
  const { watchlist, bookmark } = useUserContext();
  const [movies, setMovies] = useState<Movie[]>([]); 
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]); 
  const [filters, setFilters] = useState({ language: '', format: '', genre: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [noMoviesMessage, setNoMoviesMessage] = useState("");  

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getAllMovies(filters); 
        if (data.message) {
          setNoMoviesMessage(data.message); 
          setMovies([]);  
        } else {
          const runningMovies = data.filter((movie: Movie) => movie.status === 'Running');
          setMovies(runningMovies); 
          setNoMoviesMessage("");  
        }
      } catch (error) {
        //console.error('Error fetching movies', error);
      }
    };

    fetchMovies(); 
  }, [filters]);  

  useEffect(() => {
    let filtered = movies;

    if (searchTerm) {
      filtered = filtered.filter((movie) =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMovies(filtered);
  }, [searchTerm, movies]);  

  const clearFilters = () => {
    setFilters({ language: '', format: '', genre: '' }); 
  };

  return (
    <HomeContainer>
      <LeftSection>
        <FilterGrid
          onFilterChange={(type, value) => setFilters({ ...filters, [type]: value })}
          onClearFilters={clearFilters}
          filters={filters} 
        />
      </LeftSection>

      <RightSection1>
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
              <NoMoviesFound>No movies match your search.</NoMoviesFound>  
            )}
          </MovieList>
        )}
      </RightSection1>
    </HomeContainer>
  );
};

export default Home;
