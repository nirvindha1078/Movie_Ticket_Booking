using Movie_Ticket.Models;
using MongoDB.Driver;
using Movie_Ticket.Repository.Movies;

namespace Movie_Ticket.Services.Movies
{
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _movieRepository;

        public MovieService(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }

        public async Task<Movie> CreateMovieAsync(Movie movie)
        {
            var createdMovie = await _movieRepository.CreateAsync(movie);
            return createdMovie;
        }


        public async Task<List<Movie>> GetAllMoviesAsync()
        {
            return await _movieRepository.GetAllAsync();
        }

        public async Task<Movie> GetMovieByIdAsync(string id)
        {
            return await _movieRepository.GetByIdAsync(id);
        }

        public async Task UpdateMovieAsync(string id, Movie movie)
        {
            await _movieRepository.UpdateAsync(id, movie);
        }

        public async Task DeleteMovieAsync(string id)
        {
            await _movieRepository.DeleteAsync(id);
        }

        public async Task<List<Movie>> GetMoviesByFilterAsync(string language, string format, string genre)
        {
            var filterBuilder = Builders<Movie>.Filter;
            var filters = new List<FilterDefinition<Movie>>();

            if (!string.IsNullOrEmpty(language))
                filters.Add(filterBuilder.Eq(m => m.Language, language));

            if (!string.IsNullOrEmpty(format))
                filters.Add(filterBuilder.Eq(m => m.Format, format));

            if (!string.IsNullOrEmpty(genre))
                filters.Add(filterBuilder.Eq(m => m.Genre, genre));

            var combinedFilter = filters.Count > 0 ? filterBuilder.And(filters) : filterBuilder.Empty;
            return await _movieRepository.GetMoviesByFiltersAsync(combinedFilter);
        }

        public async Task<List<Movie>> GetMovieByIdsAsync(List<string> movieIds)
        {
            return await _movieRepository.GetMovieByIdsAsync(movieIds);
        }

        public async Task UpdateMovieStatusAsync(string id, string status)
        {
            if (status != "Running" && status != "Upcoming")
            {
                throw new Exception("Invalid status value. Status must be 'running' or 'upcoming'.");
            }

            await _movieRepository.UpdateMovieStatusAsync(id, status);
        }
    }
}
