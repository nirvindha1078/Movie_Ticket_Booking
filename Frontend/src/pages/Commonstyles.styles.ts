import styled from 'styled-components';

export const Container = styled.div`
  margin-left:20px;
  margin-right-20px;
`;

export const NavbarContainer = styled.div`
  background-color:white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: black;
  display: flex;
  height: 44px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  width: 95%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding-bottom:5px;
  margin:10px 20px 10px 20px;
  margin-right:30px;
  margin-bottom:10px;

  @media (max-width: 768px) {
    padding: 8px 12px;
  }
`;

export const NavbarLogo = styled.div`
  img {
    height: 45px;
    width:55px;
    padding-left:10px;
    border-radius:5px;
    background-color: transparent;
  }
  @media (max-width: 768px) {
    img {
      height: 50px;
    }
  }
`;

export const NavbarLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

export const NavbarLink = styled.li`
  display: inline-block;

  a {
    color: black;
    text-decoration: none;
    font-size: 20px;
    padding: 5px 10px;
    border-radius: 4px;
  }

   a:hover {
    color: blue;  
  }
`;

export const RightSection = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding-left: 400px; 
  justify-content: center;
  flex-grow: 1;

  @media (max-width: 768px) {
    padding-left: 0;
    flex-direction: column;
  }
`;

export const FormContainer = styled.div`
  margin-top:100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: #f4f4f4;
  margin-left:450px;
  width:500px;

  @media (max-width: 768px) {
    margin-left: 20px;
    width: 90%;
    margin-top: 50px;
  }
`;

export const FormBox = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

   @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;


  label {
    margin-bottom: 8px;
    margin-left:20px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  input {
    padding: 10px;
    margin-left:20px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border 0.3s;
    width:400px;
    margin-right-10px;
  }

  input:focus {
    border-color: #007bff;
  }

   @media (max-width: 768px) {
    input {
      width: 100%;
    }
  }
`;

export const Input = styled.input`
  width: 100%;
`;

export const SubmitButton = styled.button`
  padding: 12px;
  font-size: 18px;
  background-color: rgb(110, 235, 125);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 50%;
  justify-content: center;
  align-items: center;
  margin-left: 115px;

  &:hover {
    background-color: rgb(173, 228, 179);
  }

  &:focus {
    outline: none; 
    box-shadow: 0 0 0 3px rgba(110, 235, 125, 0.5); 
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;


export const SignupButton = styled.button`
  background-color:rgb(118, 189, 247);
  color: white;
  &:hover {
    background-color:rgb(161, 197, 232);
  }
`;
export const ErrorTexts = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  margin-left:20px;
`;

export const FilterGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color:white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width:150px;
  margin-top:30px;
  margin-bottom:20px;
  height: 400px;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FilterSection=styled.div`

  h4 {
    margin: 10px 0 0 0 ;
    
  }
`;

export const FilterHeading=styled.h4`
// margin-bottom:10px;
`;

export const FilterItem = styled.div`
  // margin-bottom: 10px;
`;

export const FilterSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

export const RightSection1 = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 5px;
  padding-left: 5px;
  width: 1200px;
`;

export const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; 
  justify-content: center;
  margin-top: 20px;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

export const MovieCardContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px; 
  padding: 15px;
  height:480px;
  text-align: center;
  flex-shrink: 0;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

export const MoviePoster = styled.img`
  width: 100%;
  height: 250px;
  object-fit:contain;
  border-radius: 8px;
`;

export const MovieName = styled.h3`
  margin-top: 10px;
  font-size: 20px;
  color: #333;
  margin-bottom:5px;
`;

export const MovieLanguage = styled.p`
  font-size: 18px;
  color: #777;
  margin:0;
`;

export const MovieDetailsInfo=styled.p`
    font-size: 16px;
    color: #777;
    margin:0;
`;

export const BookButton = styled.button`
  margin-top: 5px;
  margin-left:42px;
  padding: 10px;
  background-color:#2dec43;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width:50%;

  &:hover {
    background-color:rgb(173, 228, 179);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const NoMoviesFound = styled.div`
  text-align: center;
  font-size: 18px;
  color: #ff0000;
  margin-top: 20px;
`;

export const HomeContainer = styled.div`
  display: flex;
  padding: 30px 20px;
  margin-top: 60px;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

export const LeftSection = styled.div`
  width: 150px;
  margin-right: 20px;
  height: fit-content;
  margin: 85px 20px 20px 20px;
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
`;

export const PorjTitle = styled.h2`
text-align:center;
font-size: 30px;
`;

export const SearchBoxContainer = styled.div`
  justify-content: center;
  text-align: center;
  width: 80%;
  margin: 20px auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchInput = styled.input`
  padding: 12px;
  width: 700px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

export const MovieBookingPageContainer = styled.div`
  width: 80%;
  padding-top: 100px;  
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  place-self:center;
  margin-left:400px;
  margin-right:30px;
`;

export const MovieDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  gap: 20px;
  width:100%;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const MovieInfo = styled.div`
  flex: 1;
  padding-right: 20px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const MovieTitle = styled.h1`
  font-size: 40px;
  margin-bottom: 15px;
  color: #333;
`;


export const MoviePosterStyled = styled(MoviePoster)`
  width: 300px;
  height: 250px;
  object-fit: contain;
  border-radius: 8px;
`;

export const DateFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const DateSelect = styled(FilterSelect)`
  width: 250px;
`;

export const FilterContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-left: 20px;
  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

export const TheaterSearchContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const TheaterSearchInput = styled(SearchInput)`
  width: 100%;
  margin-bottom: 10px;
`;

export const TheaterListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const TheaterContainer = styled.div`
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const TheaterName = styled.h3`
  font-size: 22px;
  margin-bottom: 10px;
  color: #333;
  margin-top: 0;
`;

export const TheaterInfo = styled.p`
  font-size: 14px;
  color: #777;
  margin: 0;
`;

export const TheaterTimeSlots = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const TimeSlotButton = styled.button`
  background-color:rgb(110, 235, 125);
  color: white;
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color:#ade4b3;
    border: none;
  }

  &:active {
    background-color: #003366;
    border: none;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const FilterSelect1 = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

export const NoTheaterFoundMessage = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #f44336;  // Red color for emphasis
  text-align: center;
  padding: 20px;
`;

export const LogoutButton= styled.a`
  font-size:20px;
  padding:10px;
`;

export const ResetButton= styled.button`
  font-size:15px;
  padding:10px;
  background-color:#6eeb7d;
  &:hover {
    background-color:#ade4b3;
  }
`;

export const ContainerBooking = styled.div`
  width: 60%;
  max-width: 800px;
  margin-top:120px;
  margin-left:350px;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Section = styled.div`
  margin-bottom: 10px;
`;

export const SectionDate=styled.div`
margin-right:10px;
padding-right:2px;
`;


export const SectionSeats=styled.div`
margin-top:20px;
margin-left:130px;
`;

export const SectionTitle = styled.h3`
  text-align:center;
  font-size:25px;
  color: #444;
`;

export const InfoText = styled.p`
  font-size: 18px;
  color: #666;
`;

export const Label = styled.label`
  font-size: 18px;
  color: #666;
  margin-right: 10px;
`;

export const Input1 = styled.input`
  padding: 8px;
  margin: 10px 0;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap:30px;
  margin-top: 20px;
  place-self:center;
`;

export const Button = styled.button<{ disabled?: boolean }>`
  padding: 10px 20px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#6eeb7d")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  &:hover {
    background-color: ${(props) => !props.disabled && "#ade4b3"};
  }
`;

export const SeatsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const SeatButton = styled.button`
  padding: 5px 10px;
  font-size: 1.5rem;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  width:60px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const SeatCount = styled.span`
  margin: 0 10px;
  font-size: 1.5rem;
  color: #333;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 1rem;
  text-align: center;
  margin-top: 20px;
`;

export const MovieContainer=styled.div`
 display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  gap: 20px;
  width:100%;
`;

export const MovieDetails=styled.div`
  flex: 1;
  padding-right: 20px;
`;

export const MovieTitleUpdate=styled.h1`
font-size:28px;
`;

export const PosterStyled=styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  justify-content:left;
`;
 export const BookingContainer=styled.div`
  display: flex;
  gap: 80px;
  width:100%;
 `;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  margin-top:90px;
  background:white;
  padding: 10px;
  border-radius: 8px;
  height:500px;
  width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding:10px;
`;

export const ModalTitle = styled.h3`
  font-size: 24px;
  color: #333;
`;

export const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #6eeb7d;
  color: white;
  border: none;
  width:80px;
  place-self:center;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #ade4b3;
  }
`;

export const TextDisp = styled.p`
  place-self:center;
  font-size:18px;
`;

export const TextDispMovie = styled.p`
font-size:20px;
place-self:center;
`;

export const ContainerDiv = styled.div`
  padding: 20px;
  display: flex;
  margin-top: 80px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  place-self:center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  margin-left: 360px;
`;

export const LoadingMessage = styled.p`
  font-size: 1.5rem;
  color: #888;
  margin-left: 360px;
`;

export const NoOrdersMessage = styled.p`
  font-size: 1.5rem;
  color: #d9534f;
  margin-left: 360px;
`;

export const OrdersList = styled.div`
  display: grid;
  flex-direction: column;
  gap: 20px;
  width: 50%;
  margin-left:350px;
`;

export const OrderCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 300px;
`;

export const MovieDetails1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const MovieInfo1 = styled.div`
  flex: 1;
  margin-right: 10px;
  padding-right:10px;
`;

export const MovieTitle1 = styled.h2`
  font-size: 30px;
  color: #333;
`;

export const MovieDetailsText = styled.div`
  font-size: 18px;
  color: #777;
`;

export const MoviePoster1 = styled.div`
  flex-shrink: 0;
  width: 200px;
  img {
    width: 100%;
    height: 245px;
    border-radius: 8px;
  }
`;

export const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 0px;
`;

export const TheaterInfo1 = styled.div`
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
`;

export const OrderInfo = styled.div`
  font-size: 1rem;
  color: #777;
  margin-top: 10px;
  p {
    margin: 5px 0;
  }
`;

export const OrderInfoDiv = styled.div`
  display:flex;
  gap:30px;
  justify-content:space-between;
`;

export const BookingContainerNew = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  margin-top: 5px;
  width: 100%;
`;

export const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-direction: column;
  margin-left:25px;
`;

export const ActionButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  //background-color:rgb(118, 189, 247);
  color: white;
  border: none;
  border-radius: 5px;
  
  // &:active{
  //  color: whit
  // }
  &:disabled {
    //background-color: #cccccc;
    cursor: not-allowed;
  }
`;

 export const Favourties=styled.h2`
  font-size: 35px;
  color: #333;
  margin-bottom: auto;
  margin-left: 28px;
  margin-bottom: 15px;
  padding-left: 30%;
 `;

export const MovieCardContainer1 = styled.div`
  width: 200px;
  height:380px;
  padding: 10px;
  padding-bottom:10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const MoviePosterWatchlist = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 5px;
`;

export const MovieName1 = styled.h3`
  font-size: 20px;
  margin-top: 10px;
  margin-bottom:10px;
`;

export const MovieLanguage1 = styled.p`
  font-size: 16px;
  color: #555;
   margin-top: 10px;
`;

export const RemoveButton = styled.button`
  margin-top: 5px;
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width:50%;

  &:hover {
    background-color: #d32f2f;
  }
`;

export const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  margin: 10px;
  margin-right:40px;
`;

export const MovieCard1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  margin: 10px;
  margin-right:10px;
`;

export const NoContainer = styled.div`

  backgorund-color: #f9f9f9f9;
  width: 300px;
  border-radius: 10px;

`;

export const FeatureContainer=styled.div`
  margin-top:100px;
  margin-left:280px;
  max-width: 1080px;
`;

export const FeatureContainer1=styled.div`
  margin-top:100px;
  margin-left:180px;
  max-width: 1080px;
`;

export const MovieStatus=styled.p`
font-size: 18px;
  color: #777;
  margin-top:2px;
`;

export const CategorySection = styled.div`
  margin-bottom: 40px; /* Adds spacing between categories */

  h2 {
    font-size: 1.5rem; /* Set heading size */
    font-weight: bold;
    color: #333; /* Dark text color */
    margin-bottom: 15px; /* Add margin at the bottom of the heading */
    text-transform: uppercase; /* Optional: for all caps on category names */
  }

  .movie-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* Responsive grid for movie cards */
    gap: 20px; /* Space between movie cards */
    padding: 0;
    margin: 0;
  }

  /* Message for when no movies are found */
  .no-movies {
    text-align: center;
    font-size: 1.2rem;
    color: #555; /* Light gray text for no movies message */
    margin-top: 10px;
  }
`;

export const HomeContainerMovies=styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center; 
  padding: 20px;
  min-height: 100vh;
  margin-top: 70px;
  width:1250px;
  margin-left:20px;
`;

export const Watchlist=styled.h2`
 font-size: 35px;
  color: #333;
  margin-left: 28%;
  margin-bottom: 15px;
`;

export const BookButton1=styled.button`
  margin-top: 5px;
  padding: 8px 16px;
  background-color:#2dec43;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom:10px;
  width:65%;

  &:hover {
    background-color:rgb(173, 224, 157);;
  }
`;
export const MovieCardContainer2=styled.div`
 width: 250px;
  height:440px;
  padding: 10px;
  padding-bottom:10px;
  gap:20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const DateButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
`;

export const DateButton = styled.button<{ selected: boolean }>`
  padding: 10px 20px;
  font-size: 14px;
  background-color: ${(props) => (props.selected ? "#007BFF" : "#f0f0f0")}; 
  color: ${(props) => (props.selected ? "white" : "#333")}; 
  border: ${(props) => (props.selected ? "2px solid #0056b3" : "1px solid #ccc")}; 
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, border 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.selected ? "#007BFF" : "#ddd")}; 
  }

  &:disabled {
    background-color: #e0e0e0; // Disabled button background color
    color: #aaa; // Disabled button text color
    cursor: not-allowed; // Change cursor for disabled state
    border: 1px solid #ccc; // Keep the border for disabled buttons
  }
`;