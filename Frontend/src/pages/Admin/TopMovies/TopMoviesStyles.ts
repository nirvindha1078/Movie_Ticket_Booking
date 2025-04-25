import styled from "styled-components";
export {
    OuterDiv,
    MovieCard,
    MoviePoster,
    MovieDetails,
    Alert,
    MovieBookedTitle
};
const OuterDiv = styled.div`
  margin-left: 16%;
  padding: 20px;
`;

const MovieCard = styled.div`
  width: 250px;
  background-color: #f9f9f9;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: 'flex';
   flexWrap: 'wrap';
   gap: '20px'
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
`;

const MovieDetails = styled.div`
  margin-top: 10px;
  text-align: left;
`;

const Alert = styled.div`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  margin-top: 20px;
  width: 30%;
  margin-left: 25%;
`;

const MovieBookedTitle = styled.h2`
  margin-left: 42%;
  marigin-top: 60px;
  font-size: 30px;
`;
