using MongoDB.Driver;
using Movie_Ticket.Models;
using System.Diagnostics.CodeAnalysis;

namespace Movie_Ticket.Repository.Watchlists
{
    [ExcludeFromCodeCoverage]
    public class WatchlistRepository : IWatchlistRepository
    {
        private readonly IMongoCollection<Watchlist> _watchlistCollection;

        public WatchlistRepository(IMongoDbContext context)
        {
            _watchlistCollection = context.Watchlist;
        }

        public async Task<Watchlist> GetWatchlistByUserIdAsync(string userId)
        {
            return await _watchlistCollection.Find(w => w.UserId == userId).FirstOrDefaultAsync();
        }

        public async Task<bool> AddMovieToWatchlistAsync(string movieId, string userId)
        {
            var watchlist = await GetWatchlistByUserIdAsync(userId);

            if (watchlist == null)
            {
                watchlist = new Watchlist
                {
                    UserId = userId,
                    MovieIds = new List<string> { movieId }
                };
                await _watchlistCollection.InsertOneAsync(watchlist);
            }
            else
            {
                if (!watchlist.MovieIds.Contains(movieId))
                {
                    watchlist.MovieIds.Add(movieId);
                    var update = Builders<Watchlist>.Update.Set(w => w.MovieIds, watchlist.MovieIds);
                    await _watchlistCollection.UpdateOneAsync(w => w.UserId == userId, update);
                }
            }
            return true;
        }

        public async Task<bool> RemoveMovieFromWatchlistAsync(string movieId, string userId)
        {
            var watchlist = await GetWatchlistByUserIdAsync(userId);

            if (watchlist == null || !watchlist.MovieIds.Contains(movieId))
            {
                return false; 
            }

            watchlist.MovieIds.Remove(movieId);
            var update = Builders<Watchlist>.Update.Set(w => w.MovieIds, watchlist.MovieIds);
            await _watchlistCollection.UpdateOneAsync(w => w.UserId == userId, update);

            return true;
        }
    }
}
