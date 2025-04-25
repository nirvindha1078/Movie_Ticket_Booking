import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BookingContainer,Button,ButtonContainer,ContainerBooking,ErrorMessage,InfoText,Input1,Label,MovieContainer,MovieDetails,MovieTitleUpdate,
  PosterStyled,SeatButton,SeatCount,SeatsContainer,Section,SectionDate,SectionSeats,ModalOverlay,ModalContainer,ModalContent,ModalTitle,
  ModalButton,TextDisp,TextDispMovie} from "../Commonstyles.styles";

const ConfirmBooking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    movieId,movieName,theaterName,theaterAddress,timeSlot,ticketPrice,availableSeats,theaterId,movieLanguage,movieFormat,movieGenre,
    moviePoster,movieRuntime,movieRating,selectedDate} = location.state || {};

  const [seats, setSeats] = useState<number>(0);
  const [error, setError] = useState<string>(""); 
  const [isBookingInProgress, setIsBookingInProgress] = useState<boolean>(false);
  const [isBookingValid, setIsBookingValid] = useState<boolean>(true); 
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false); 

  const totalPrice = seats * ticketPrice;

  const handleSeatChange = (change: number) => {
    if (seats + change >= 0 && seats + change <= availableSeats) {
      setSeats(seats + change);
    }
  };

  const validateBooking = () => {
    if (seats <= 0) {
      setError("Please select the number of seats.");
      setIsBookingValid(false);
      return false;
    }

    setError(""); 
    setIsBookingValid(true); 
    return true;
  };

  useEffect(() => {
    if (hasAttemptedSubmit) {
      validateBooking();
    }
  }, [seats, hasAttemptedSubmit]);

  const handleConfirmBooking = async () => {
    const userid = localStorage.getItem("userId");

    setHasAttemptedSubmit(true); 
    if (!validateBooking()) {
      return; 
    }

    if (!isBookingValid) {
      return;
    }

    setIsBookingInProgress(true);
    try {
      const orderData = {
        movieId: movieId,
        userId: userid,
        theaterId: theaterId,
        date: selectedDate,
        time: timeSlot,
        seatsBooked: seats,
        totalPrice: totalPrice,
      };

      const orderResponse = await axios.post(
        "https://localhost:7128/api/order",
        orderData
      );
      //console.log(orderData);

      if (orderResponse.status === 201) {

        await axios.patch(
          `https://localhost:7128/api/theater/${theaterId}/timeslot?time=${timeSlot}`,
          { seatsBooked: seats }
        );

        setIsSuccessModalOpen(true); 

      } else {
        setError(`Failed to confirm booking. Status code: ${orderResponse.status}`);
      }
    } catch (error) {
      //console.error("Error during booking:", error);
      setError("An error occurred while processing your booking.");
    } finally {
      setIsBookingInProgress(false);
    }
  };

  const handleReset = () => {
    setSeats(0);
    setError(""); 
    setHasAttemptedSubmit(false);
  };

  return (
    <ContainerBooking>
      <Section>
        <MovieContainer>
          <MovieDetails>
            <MovieTitleUpdate>{movieName}</MovieTitleUpdate>
            <InfoText>{movieLanguage} | {movieFormat} | {movieGenre}</InfoText>
            <InfoText><b>Runtime:</b> {movieRuntime} mins</InfoText>
            <InfoText><b>Rating:</b> {movieRating}/5</InfoText>
          </MovieDetails>
          <PosterStyled src={moviePoster} alt={movieName} />
        </MovieContainer>
        <InfoText><b>Theater: </b>{theaterName}</InfoText>
        <InfoText><b>Address: </b>{theaterAddress}</InfoText>
        <InfoText><b>Time Slot: </b>{timeSlot}</InfoText>
        <InfoText><b>Ticket Price: </b>Rs.{ticketPrice}</InfoText>
      </Section>

      <BookingContainer>
      <SectionDate>
        <InfoText><b>Date Selected :</b><br></br>{selectedDate}</InfoText>
        </SectionDate>

        <SectionSeats>
          <Label><b>Number of Seats: </b></Label>
          <SeatsContainer>
            <SeatButton onClick={() => handleSeatChange(-1)}>-</SeatButton>
            <SeatCount>{seats}</SeatCount>
            <SeatButton onClick={() => handleSeatChange(1)}>+</SeatButton>
          </SeatsContainer>
        </SectionSeats>
      </BookingContainer>

      <Section>
        <InfoText><b>Available Seats: </b>{availableSeats}</InfoText>
      </Section>

      <Section>
        <InfoText><b>Total Price: </b>Rs.{totalPrice}</InfoText>
      </Section>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ButtonContainer>
        <Button
          onClick={handleConfirmBooking}
          disabled={isBookingInProgress || !isBookingValid}
        >
          {isBookingInProgress ? "Booking..." : "Confirm Booking"}
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </ButtonContainer>

      {isSuccessModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <ModalContent>
              <ModalTitle>Booking Confirmed!</ModalTitle>
              <TextDispMovie><b>{movieName}</b></TextDispMovie>
              <TextDisp><b>{theaterName}</b></TextDisp>
              <TextDisp>{theaterAddress}</TextDisp>
              <TextDisp>{selectedDate} | {timeSlot}</TextDisp>
              <TextDisp><b>Seats:</b> {seats} | <b>Total Price:</b> Rs.{totalPrice}</TextDisp>
              <ModalButton onClick={() => navigate("/")}>OK</ModalButton>
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </ContainerBooking>
  );
};

export default ConfirmBooking;
