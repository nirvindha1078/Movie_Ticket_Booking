import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MovieBookingPageContainer,
  MovieDetailsContainer,
  MovieInfo,
  MovieTitle,
  MoviePosterStyled,
  TheaterSearchContainer,
  TheaterSearchInput,
  TheaterListContainer,
  TheaterContainer,
  TheaterName,
  TheaterInfo,
  TheaterTimeSlots,
  TimeSlotButton,
  NoTheaterFoundMessage,
  DateButtonContainer,
  DateButton,
} from "../Commonstyles.styles";

interface TimeSlot {
  id: string;
  time: string;
  availableSeats: number;
}

interface Theater {
  id: string;
  name: string;
  address: string;
  timeSlots: TimeSlot[];
}

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

const MovieBookingPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie[]>([]);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieAndTheaters = async () => {
      try {
        const movieResponse = await axios.get(`https://localhost:7128/api/movie/ids?movieIds=${movieId}`);
        setMovie(movieResponse.data);
        //console.log(movieResponse.data);
        const theaterIdsResponse = await axios.get(`https://localhost:7128/api/theater/gettheateridsbymovieid/${movieId}`);
        const theaterIds = theaterIdsResponse.data;

        if (theaterIds.length > 0) {
          const queryStringTheater = theaterIds.map(id => `theaterIds=${id}`).join('&');
          const urlTheater = `https://localhost:7128/api/theater/ids?${queryStringTheater}`;
          const theaterResponses = await axios.get(urlTheater);
          setTheaters(theaterResponses.data);
        } else {
          setTheaters([]);
        }
      } catch (error) {
        setTheaters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieAndTheaters();
  }, [movieId]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredTheaters = theaters.filter((theater) =>
    theater.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeSlotClick = (movie: Movie, theater: Theater, timeSlot: TimeSlot) => {
    navigate('/confirm-booking', {
      state: {
        movieId: movie.id,
        movieName: movie.name,
        theaterName: theater.name,
        theaterAddress: theater.address,
        timeSlot: timeSlot.time,
        ticketPrice: movie.ticketPrice,
        availableSeats: timeSlot.availableSeats,
        theaterId: theater.id,
        movieLanguage: movie.language,
        movieFormat: movie.format,
        movieGenre: movie.genre,
        moviePoster: movie.posterUrl,
        movieRuntime: movie.runTime,
        movieRating: movie.rating,
        selectedDate: selectedDate,
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const getNextFiveDates = () => {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const dateButtons = getNextFiveDates();

  const isTimeSlotValid = (timeSlot: string): boolean => {
    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);
  
    if (selectedDateObj.toDateString() !== currentDate.toDateString()) {
      return true;
    }
    const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes(); 
    const [time, modifier] = timeSlot.split(" ");
    let [timeSlotHour, timeSlotMinute] = time.split(":").map(Number);
  
    if (modifier === "PM" && timeSlotHour !== 12) {
      timeSlotHour += 12;
    } else if (modifier === "AM" && timeSlotHour === 12) {
      timeSlotHour = 0;
    }
  
    if (isNaN(timeSlotHour) || isNaN(timeSlotMinute)) {
      //console.error(`Invalid time slot: ${timeSlot}`);
      return false;
    }
    const selectedTime = timeSlotHour * 60 + timeSlotMinute; 
    return currentTime < selectedTime;
  };
  
  return (
    <MovieBookingPageContainer>
      <MovieDetailsContainer>
        <MovieInfo>
          <MovieTitle>{movie[0].name}</MovieTitle>
          <p>{movie[0].language} | {movie[0].format} | {movie[0].genre}</p>
          <p><b>Run Time: </b>{movie[0].runTime} mins</p>
          <p><b>Rating: </b>{movie[0].rating}/5</p>
          <p><b>Status: </b>{movie[0].status}</p>
        </MovieInfo>
        <MoviePosterStyled src={movie[0].posterUrl} alt={movie[0].name} />
      </MovieDetailsContainer>

      <DateButtonContainer>
        {dateButtons.map((date) => (
          <DateButton
            key={date}
            onClick={() => handleDateClick(date)}
            selected={selectedDate === date}
          >
            {new Date(date).toLocaleDateString()}
          </DateButton>
        ))}
      </DateButtonContainer>

      <TheaterSearchContainer>
        <TheaterSearchInput
          type="text"
          placeholder="Search for theaters..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </TheaterSearchContainer>

      <TheaterListContainer>
        {filteredTheaters.length === 0 ? (
          <NoTheaterFoundMessage>No theaters found</NoTheaterFoundMessage>
        ) : (
          filteredTheaters.map((theater) => (
            <TheaterContainer key={theater.id}>
              <TheaterName>{theater.name}</TheaterName>
              <TheaterInfo>{theater.address}</TheaterInfo>
              <TheaterTimeSlots>
                  {theater.timeSlots
                    .filter(timeSlot => isTimeSlotValid(timeSlot.time))  
                    .map((timeSlot) => (
                      <TimeSlotButton
                        key={timeSlot.id}
                        onClick={() => handleTimeSlotClick(movie[0], theater, timeSlot)}
                        disabled={timeSlot.availableSeats === 0} 
                      >
                        {timeSlot.time}
                      </TimeSlotButton>
                  ))}
              </TheaterTimeSlots>
            </TheaterContainer>
          ))
        )}
      </TheaterListContainer>
    </MovieBookingPageContainer>
  );
};

export default MovieBookingPage;
