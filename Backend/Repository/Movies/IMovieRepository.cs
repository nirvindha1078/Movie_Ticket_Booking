using Movie_Ticket.Models;
using MongoDB.Driver;

namespace Movie_Ticket.Repository.Movies
{
    public interface IMovieRepository
    {
        Task<Movie> CreateAsync(Movie movie);
        Task<List<Movie>> GetAllAsync();
        Task<Movie> GetByIdAsync(string id);
        Task UpdateAsync(string id, Movie movie);
        Task DeleteAsync(string id);

        Task<List<Movie>> GetMoviesByFiltersAsync(FilterDefinition<Movie> filter);
        Task<List<Movie>> GetMovieByIdsAsync(List<string> movieIds);

        Task UpdateMovieStatusAsync(string id, string status);

    }
}
