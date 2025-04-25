import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NavbarContainer, NavbarLogo, NavbarLinks, NavbarLink, RightSection, LogoutButton } from '../../pages/Commonstyles.styles'; 
import logo from '../../assets/movies.png';
import { AuthContext } from '../../context/Auth/AuthContext'; 
import { UserContext } from '../../context/User/UserContext';

const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  
  const isAuthenticated = authContext?.isAuthenticated;
  const logout = authContext?.logout;

  const navigate = useNavigate();  
  const location = useLocation(); 

  const handleLogout = () => {
    if (logout) {
      logout();  
      userContext?.setWatchlist([]); 
      userContext?.setBookmark([]);  
      navigate('/');  
    }
  };

  const handleNavigation = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();  
      navigate('/login');
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <NavbarContainer>
      <NavbarLogo>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </NavbarLogo>

      <NavbarLinks>
        <NavbarLink className={isActive('/')}>
          <Link to="/">Home</Link>
        </NavbarLink>
        <NavbarLink className={isActive('/movies')}>
          <Link to="/movies">Movies</Link>
        </NavbarLink>
        
        <NavbarLink className={isActive('/bookmark')}>
          <Link 
            to="/bookmark" 
            onClick={(e) => handleNavigation(e)}
          >
            Favourties
          </Link>
        </NavbarLink>
        <NavbarLink className={isActive('/watchlist')}>
          <Link 
            to="/watchlist" 
            onClick={(e) => handleNavigation(e)}
          >
            Watchlist
          </Link>
        </NavbarLink>
        <NavbarLink className={isActive('/orders')}>
          <Link 
            to="/orders" 
            onClick={(e) => handleNavigation(e)}
          >
            Bookings
          </Link>
        </NavbarLink>
      </NavbarLinks>

      <RightSection>
        {!isAuthenticated ? (  
          <>
            <NavbarLink>
              <Link to="/login">Login</Link>
            </NavbarLink>
            <NavbarLink>
              <Link to="/signup">Sign Up</Link>
            </NavbarLink>
          </>
        ) : (  
          <NavbarLink>
            <LogoutButton href="#" onClick={handleLogout}>Logout</LogoutButton>
          </NavbarLink>
        )}
      </RightSection>
    </NavbarContainer>
  );
};

export default Navbar;
