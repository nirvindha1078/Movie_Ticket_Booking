using Movie_Ticket.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Movie_Ticket.Services.Movies
{
    public interface IMovieService
    {
        Task<Movie> CreateMovieAsync(Movie movie);
        Task<List<Movie>> GetAllMoviesAsync();
        Task<Movie> GetMovieByIdAsync(string id);
        Task UpdateMovieAsync(string id, Movie movie);
        Task DeleteMovieAsync(string id);

        Task<List<Movie>> GetMoviesByFilterAsync(string language, string format, string genre);
        Task<List<Movie>> GetMovieByIdsAsync(List<string> movieIds);

        Task UpdateMovieStatusAsync(string id, string status);
    }
}
