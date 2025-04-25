const API_URL = "https://localhost:7128/api/movie"; 

export interface Movie {
  id: string;
  name: string;
  language: string;
  format: string;
  genre: string;
  posterUrl: string;
  runTime: string;
  rating: number;
  status:string;
}

export const getAllMovies = async (filters: { language: string; format: string; genre: string }) => {
    try {
      const queryParams = new URLSearchParams();
  
      if (filters.language) queryParams.append('language', filters.language);
      if (filters.format) queryParams.append('format', filters.format);
      if (filters.genre) queryParams.append('genre', filters.genre);
  
      const response = await fetch(`${API_URL}/filter?${queryParams.toString()}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Error fetching movies');
      }
  
      const data = await response.json();
  
      if (data.message) {
        return { message: data.message }; 
      }
  
      return data; 
    } catch (error) {
      //console.error('Error fetching movies:', error);
      throw error;
    }
  };
  
  
