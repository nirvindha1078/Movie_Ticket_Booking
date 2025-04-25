import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {AdminTitle, AdminDashboardWrapper, Card, CardsContainer, Column, LogoutButton, Para} from '../Dashboard/DashboardStyles';
import { useAuthContext } from '../../../context/Auth/AuthContext';
const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const { logout } = useAuthContext();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');

    if (!adminToken) {
      navigate('/login');
    }
  }, [navigate]);

  const handleCardClick = (card: string) => {
    if (card === "addMovie") {
      navigate('/admin/addmovie');
    }
    if (card === "updateMovieStatus") {
      navigate('/admin/updateMovie');
    }

    if (card === "deleteMovie") {
      navigate('/admin/deleteMovie');
    }
    if (card === "viewUsers") {
      navigate('/admin/viewUsers');
    }
    if (card === "topUsers") {
      navigate('/admin/topUsers');
    }
    if (card === "topMovies") {
      navigate('/admin/topMovies');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminToken');
    logout();
    navigate('/login');
  };

  return (
    <div>
      <AdminTitle>Welcome, Admin!</AdminTitle>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <AdminDashboardWrapper>
        <CardsContainer>
          <Column>
            <Card onClick={() => handleCardClick("addMovie")}>
              <h2>Add Movie</h2>
              <Para>Upload and manage movies</Para>
            </Card>
            <Card onClick={() => handleCardClick("updateMovieStatus")}>
              <h2>Update Movie Status</h2>
              <Para>Edit existing movie status</Para>
            </Card>
            <Card onClick={() => handleCardClick("deleteMovie")}>
              <h2>Delete Movie</h2>
              <Para>Remove movies from the system</Para>
            </Card>
          </Column>

          <Column>
          <Card onClick={() => handleCardClick("viewUsers")}>
              <h2>View Total Users</h2>
              <Para>Get the total number of users registerd</Para>
            </Card>
            <Card onClick={() => handleCardClick("topUsers")}>
              <h2>View Top Users</h2>
              <Para>Get the top 10 users with most movie bookings</Para>
            </Card>
            <Card onClick={() => handleCardClick("topMovies")}>
              <h2>View Most Booked Movies</h2>
              <Para>Get the top most booked movied</Para>
            </Card>
          </Column>
        </CardsContainer>
      </AdminDashboardWrapper>
    </div>
  );
};

export default AdminDashboard;
