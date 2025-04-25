import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import axios from 'axios';

interface UserContextProps {
  userId: string | null;
  watchlist: string[];
  bookmark: string[];
  setWatchlist: (watchlist: string[]) => void;
  setBookmark: (bookmark: string[]) => void;
  fetchUserData: (userId: string) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const userId = localStorage.getItem('userId');
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [bookmark, setBookmark] = useState<string[]>([]);

  //console.log('userId', userId);

  const fetchUserData = useCallback(async (userId: string) => {
    try {
      const watchlistResponse = await axios.get(`https://localhost:7128/api/watchlist?userId=${userId}`);
      const bookmarkResponse = await axios.get(`https://localhost:7128/api/bookmark?userId=${userId}`);
      
      setWatchlist(watchlistResponse.data); 
      setBookmark(bookmarkResponse.data);   
    } catch (error) {
      // Handle error
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    } else {
      setWatchlist([]);
      setBookmark([]);
    }
  }, [userId, fetchUserData]); 

  return (
    <UserContext.Provider value={{ userId, watchlist, bookmark, setWatchlist, setBookmark, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};
