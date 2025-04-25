import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieCardContainer, MoviePoster, MovieDetailsInfo, MovieName, BookButton, ActionButtonContainer, ActionButton, BookingContainerNew, MovieStatus } from '../../pages/Commonstyles.styles';
import { useUserContext } from '../../context/User/UserContext';
import { useAuthContext } from '../../context/Auth/AuthContext'; 
import axios from 'axios';
import { FaHeart, FaRegHeart, FaRegListAlt, FaListAlt } from 'react-icons/fa'; // Import React Icons
import { LuHeart } from "react-icons/lu";

export interface MovieCardProps {
  movie: {
    id: string;
    name: string;
    language: string;
    format: string;
    genre: string;
    posterUrl: string;
    runTime: string;
    rating: number;
    status: string;
    isInWatchlist: boolean;
    isInBookmark: boolean;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const { userId, watchlist, bookmark, setWatchlist, setBookmark , fetchUserData} = useUserContext();
  const { isAuthenticated } = useAuthContext();
  const [loaded, setLoaded] = useState(false); 

  const isUpcoming = movie.status === 'Upcoming';
  const isInWatchlist = watchlist.includes(movie.id);
  const isInBookmark = bookmark.includes(movie.id);

  // useEffect(() => {
  //   if (isAuthenticated && userId && (!watchlist.length || !bookmark.length)) {
  //     fetchUserData(userId); 
  //   }
  // }, [isAuthenticated, userId, watchlist, bookmark, fetchUserData]);
  

  useEffect(() => {
    if (isAuthenticated && userId && !loaded) {
      // Only fetch data once when user is authenticated and data hasn't been loaded
      fetchUserData(userId);
      setLoaded(true);  // Mark data as loaded to avoid infinite loops
    }
  }, [isAuthenticated, userId, loaded]);
  
  const handleBookTicket = () => {
    if (isAuthenticated) {
      navigate(`/movie-booking/${movie.id}`, { state: { movieDetails: movie } });
    } else {
      navigate('/login');  
    }
  };

  const handleAddToWatchlist = async () => {
    if (userId && !isInWatchlist) {
      try {
        await axios.post(`https://localhost:7128/api/watchlist?movieId=${movie.id}&userId=${userId}`);
        setWatchlist([...watchlist, movie.id]); 
      } catch (error) {
        console.error('Error adding to watchlist:', error);
      }
    } else if (isInWatchlist) {
      try {
        await axios.delete(`https://localhost:7128/api/watchlist?movieId=${movie.id}&userId=${userId}`);
        setWatchlist(watchlist.filter(id => id !== movie.id)); 
      } catch (error) {
        console.error('Error removing from watchlist:', error);
      }
    }
  };

  const handleAddToBookmark = async () => {
    if (userId && !isInBookmark) {
      try {
        await axios.post(`https://localhost:7128/api/bookmark?movieId=${movie.id}&userId=${userId}`);
        setBookmark([...bookmark, movie.id]); 
      } catch (error) {
        console.error('Error adding to bookmark:', error);
      }
    } else if (isInBookmark) {
      try {
        await axios.delete(`https://localhost:7128/api/bookmark?movieId=${movie.id}&userId=${userId}`);
        setBookmark(bookmark.filter(id => id !== movie.id));
      } catch (error) {
        console.error('Error removing from bookmark:', error);
      }
    }
  };

  useEffect(() => {}, [watchlist, bookmark]);

  return (
    <MovieCardContainer>
      <MoviePoster src={movie.posterUrl} alt={movie.name} />
      <MovieName>{movie.name}</MovieName>
      <MovieDetailsInfo>{movie.language} | {movie.format} | {movie.genre}</MovieDetailsInfo>
      <MovieStatus><strong>Status: </strong>{movie.status}</MovieStatus>
      <BookingContainerNew>
        <BookButton onClick={handleBookTicket} disabled={isUpcoming}>
          Book Ticket
        </BookButton>
        <ActionButtonContainer>
          <ActionButton onClick={handleAddToBookmark}>
            {isInBookmark ? (
              <FaHeart style={{ color: 'red' , fontSize: '18px' }} />
            ) : (
              <FaRegHeart style={{ color: 'black' , fontSize: '18px' }}/> 
            )}
          </ActionButton>

          <ActionButton onClick={handleAddToWatchlist}>
            {isInWatchlist ? (
              <FaListAlt style={{ color: 'purple', fontSize: '18px' }} /> 
            ) : (
              <FaRegListAlt style={{ color: 'black' , fontSize: '18px' }}/> 
            )}
          </ActionButton>
        </ActionButtonContainer>
      </BookingContainerNew>
    </MovieCardContainer>
  );
};

export default MovieCard;

