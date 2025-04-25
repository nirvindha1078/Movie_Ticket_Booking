import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/NavBar';  
import Home from './pages/Home/Home'; 
import Movies from './pages/Movies/Movies'; 
import Orders from './pages/Orders/Orders'; 
import Login from './pages/Login/Login'; 
import Signup from './pages/Register/Register'; 
import MovieBooking from './pages/MovieBooking/MovieBooking';
import ConfirmBooking from './pages/ConfirmBooking/ConfirmBooking';
import { Container } from './pages/Commonstyles.styles';
import WatchlistPage from './pages/Watchlist/WatchList';
import BookMark from './pages/Bookmark/BookMark';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import AddMovieAdmin from './pages/Admin/AddMovie/AddMovieAdmin';
import UpdateMovieStatus from './pages/Admin/UpdateMovies/UpdateMovieStatus';
import DeleteMovieAdmin from './pages/Admin/DeleteMovie/DeleteMovieAdmin';
import TotalUsersAdmin from './pages/Admin/TotalUsers/TotalUsersAdmin';
import TopUsersAdmin from './pages/Admin/TopUsers/TopUsersAdmin';
import MostBookedMovies from './pages/Admin/TopMovies/MostBookedMovies';

const App: React.FC = () => {
  const location = useLocation();
  
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div>
      {!isAdminRoute && <Navbar />}
      
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movie-booking/:movieId" element={<MovieBooking />} />
          <Route path="/confirm-booking" element={<ConfirmBooking />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/bookmark" element={<BookMark />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/addmovie" element={<AddMovieAdmin />} />
          <Route path="/admin/updatemovie" element={<UpdateMovieStatus/>} />
          <Route path="/admin/deletemovie" element={<DeleteMovieAdmin/>} />
          <Route path="/admin/viewUsers" element={<TotalUsersAdmin/>} />
          <Route path="/admin/topUsers" element={<TopUsersAdmin/>} />
          <Route path="/admin/topMovies" element={<MostBookedMovies/>} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
