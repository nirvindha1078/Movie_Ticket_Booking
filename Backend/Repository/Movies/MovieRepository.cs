using Movie_Ticket.Models;
using MongoDB.Driver;
using System.Diagnostics.CodeAnalysis;

namespace Movie_Ticket.Repository.Movies
{
    [ExcludeFromCodeCoverage]
    public class MovieRepository : IMovieRepository
    {
        private readonly IMongoCollection<Movie> _movies;

        public MovieRepository(IMongoDbContext context)
        {
            _movies = context.Movies; 
        }

        public async Task<Movie> CreateAsync(Movie movie)
        {
            await _movies.InsertOneAsync(movie);
            return movie;
        }

        public async Task<List<Movie>> GetAllAsync()
        {
            return await _movies.Find(movie => true).ToListAsync();
        }

        public async Task<Movie> GetByIdAsync(string id)
        {
            return await _movies.Find(movie => movie.Id == id).FirstOrDefaultAsync();
        }

        public async Task UpdateAsync(string id, Movie movie)
        {
            await _movies.ReplaceOneAsync(m => m.Id == id, movie);
        }

        public async Task DeleteAsync(string id)
        {
            await _movies.DeleteOneAsync(m => m.Id == id);
        }

        public async Task<List<Movie>> GetMoviesByFiltersAsync(FilterDefinition<Movie> filter)
        {
            return await _movies.Find(filter).ToListAsync();
        }

        public async Task<List<Movie>> GetMovieByIdsAsync(List<string> movieIds)
        {
            var filter = Builders<Movie>.Filter.In(movie => movie.Id, movieIds);
            return await _movies.Find(filter).ToListAsync();
        }

        public async Task UpdateMovieStatusAsync(string id, string status)
        {
            
            if (status != "Running" && status != "Upcoming")
            {
                throw new Exception("Invalid status value. Status must be 'running' or 'upcoming'.");
            }
            
            var filter = Builders<Movie>.Filter.Eq(m => m.Id, id);

            var update = Builders<Movie>.Update.Set(m => m.Status, status);

            var result = await _movies.UpdateOneAsync(filter, update);

            if (result.ModifiedCount == 0)
            {
                throw new Exception("Failed to update movie status or movie not found.");
            }
        }


    }
}
