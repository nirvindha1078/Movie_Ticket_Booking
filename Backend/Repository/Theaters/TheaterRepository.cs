using MongoDB.Bson;
using MongoDB.Driver;
using System.Diagnostics.CodeAnalysis;

namespace Movie_Ticket.Repository.Theaters
{
    [ExcludeFromCodeCoverage]
    public class TheaterRepository : ITheaterRepository
    {
        private readonly IMongoCollection<Theater> _theaterCollection;

        public TheaterRepository(IMongoDbContext context)
        {
            _theaterCollection = context.Theaters;
        }

        public async Task<List<Theater>> GetAllTheatersAsync()
        {
            return await _theaterCollection.Find(theater => true).ToListAsync();
        }

        public async Task<Theater> AppendMovieToTheaterAsync(string theaterId, string movieId)
        {
            var objectId = new ObjectId(theaterId);

            var update = Builders<Theater>.Update.Push(t => t.MovieIds, movieId);

            var result = await _theaterCollection.FindOneAndUpdateAsync(
                t => t.Id == objectId.ToString(),
                update,
                new FindOneAndUpdateOptions<Theater> { ReturnDocument = ReturnDocument.After }
            );

            return result; 
        }

        public async Task<Theater> GetTheaterByIdAsync(string id)
        {
            return await _theaterCollection.Find(theater => theater.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Theater> CreateTheaterAsync(Theater theater)
        {
            await _theaterCollection.InsertOneAsync(theater);
            return theater;
        }

        public async Task<Theater> UpdateTheaterAsync(string id, Theater theater)
        {
            var result = await _theaterCollection.ReplaceOneAsync(t => t.Id == id, theater);
            if (result.MatchedCount == 0)
            {
                return null;
            }
            return theater;
        }

        public async Task<bool> DeleteTheaterAsync(string id)
        {
            var result = await _theaterCollection.DeleteOneAsync(t => t.Id == id);
            return result.DeletedCount > 0;
        }

        public async Task UpdateAsync(Theater theater)
        {
            var filter = Builders<Theater>.Filter.Eq(t => t.Id, theater.Id);
            await _theaterCollection.ReplaceOneAsync(filter, theater);
        }

        public async Task<List<Theater>> GetTheatersByIdsAsync(List<string> theaterIds)
        {
            var filter = Builders<Theater>.Filter.In(theater => theater.Id, theaterIds);
            return await _theaterCollection.Find(filter).ToListAsync();
        }

        public async Task<List<string>> GetTheaterIdsByMovieIdAsync(string movieId)
        {
            // Find all theaters that have the movieId in the MovieIds list
            var filter = Builders<Theater>.Filter.AnyEq(t => t.MovieIds, movieId);
            var theaters = await _theaterCollection.Find(filter).ToListAsync();

            // Return a list of theater IDs
            var theaterIds = new List<string>();
            foreach (var theater in theaters)
            {
                theaterIds.Add(theater.Id);
            }
            return theaterIds;
        }
    }
}
