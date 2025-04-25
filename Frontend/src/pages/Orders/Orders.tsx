import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ContainerDiv,
  LoadingMessage,
  MovieDetails1,
  MovieDetailsText,
  MovieInfo1,
  MoviePoster1,
  MovieTitle1,
  NoOrdersMessage,
  OrderCard,
  OrderDetails,
  OrderInfo,
  OrderInfoDiv,
  OrdersList,
  TheaterInfo1,
  Title
} from "../Commonstyles.styles";

interface Order {
  orderId: string;
  movieId: string;
  userId: string;
  theaterId: string;
  date: string;
  time: string;
  seatsBooked: number;
  totalPrice: number;
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

interface Theater {
  id: string;
  name: string;
  address: string;
  timeSlots: TimeSlot[];
}

interface TimeSlot {
  id: string;
  time: string;
  availableSeats: number;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  //const [loading, setLoading] = useState<boolean>(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://localhost:7128/api/order/${userId}`)
        .then((response) => {
          setOrders(response.data);
          fetchMovieAndTheaterData(response.data);
        })
        .catch((error) => console.error("Error fetching orders", error));
    }
  }, [userId]);

  const fetchMovieAndTheaterData = (orders: Order[]) => {
    const movieIds = orders.map((order) => order.movieId);
    const theaterIds = orders.map((order) => order.theaterId);
    const queryStringMovie = movieIds.map(id => `movieIds=${id}`).join('&');
    const urlMovie = `https://localhost:7128/api/movie/ids?${queryStringMovie}`;
    const queryStringTheater = theaterIds.map(id => `theaterIds=${id}`).join('&');
    const urlTheater = `https://localhost:7128/api/theater/ids?${queryStringTheater}`;

    axios
      .get(urlMovie)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => console.error("Error fetching movie data", error));

    axios
      .get(urlTheater)
      .then((response) => {
        setTheaters(response.data);
      })
      .catch((error) => console.error("Error fetching theater data", error))
      .finally(() => {
        //setLoading(false);
      });
  };
  const reversedOrders = [...orders].reverse();

  return (
    <ContainerDiv>
      <Title>Your Bookings</Title>
      {orders.length === 0 ? (
        <NoOrdersMessage>No Bookings Found</NoOrdersMessage>
      ) : (
        <OrdersList>
          {reversedOrders
            .filter((order) => movies.some((movie) => movie.id === order.movieId))
            .map((order, index) => {
              const key = `${order.movieId}-${order.theaterId}-${order.orderId}-${index}`;
              const movie = movies.find((m) => m.id === order.movieId);
              const theater = theaters.find((t) => t.id === order.theaterId);

              return (
                <OrderCard key={key}>
                  <MovieDetails1>
                    <MovieInfo1>
                      {movie ? (
                        <>
                          <MovieTitle1>{movie?.name}</MovieTitle1>
                          <MovieDetailsText>
                            <p>{movie?.language} | {movie?.format} | {movie?.genre}</p>
                            <p><strong>Runtime: </strong>{movie?.runTime} mins</p>
                            <p><strong>Rating: </strong>{movie?.rating}/5</p>
                          </MovieDetailsText>
                        </>
                      ) : (
                        <MovieTitle1>Movie details not available</MovieTitle1>
                      )}
                    </MovieInfo1>
                    <MoviePoster1>
                      {movie ? (
                        <img src={movie?.posterUrl} alt={movie?.name} />
                      ) : (
                        <img src="https://via.placeholder.com/200x300" alt="Movie poster not available" />
                      )}
                    </MoviePoster1>
                  </MovieDetails1>

                  <OrderDetails>
                    <TheaterInfo1>
                      <h2>{theater?.name}</h2>
                      <p>{theater?.address}</p>
                    </TheaterInfo1>
                    <OrderInfo>
                      <OrderInfoDiv>
                        <p><strong>Date:</strong> {order.date}</p>
                        <p><strong>Time:</strong> {order.time}</p>
                      </OrderInfoDiv>
                      <OrderInfoDiv>
                        <p><strong>Seats: </strong>{order.seatsBooked}</p>
                        <p><strong>Total Price:</strong> Rs.{order.totalPrice}</p>
                      </OrderInfoDiv>
                    </OrderInfo>
                  </OrderDetails>
                </OrderCard>
              );
            })}
        </OrdersList>
      )}
    </ContainerDiv>
  );
};

export default OrdersPage;
