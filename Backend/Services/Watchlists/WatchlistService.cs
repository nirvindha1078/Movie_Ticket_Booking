using Movie_Ticket.Repository.Watchlists;

namespace Movie_Ticket.Services.Watchlists
{
    public class WatchlistService : IWatchlistService
    {
        private readonly IWatchlistRepository _watchlistRepository;

        public WatchlistService(IWatchlistRepository watchlistRepository)
        {
            _watchlistRepository = watchlistRepository;
        }

        public async Task<bool> AddMovieToWatchlist(string movieId, string userId)
        {
            return await _watchlistRepository.AddMovieToWatchlistAsync(movieId, userId);
        }

        public async Task<bool> RemoveMovieFromWatchlist(string movieId, string userId)
        {
            return await _watchlistRepository.RemoveMovieFromWatchlistAsync(movieId, userId);
        }

        public async Task<List<string>> GetWatchlistByUserId(string userId)
        {
            var watchlist = await _watchlistRepository.GetWatchlistByUserIdAsync(userId);
            if (watchlist != null)
            {
                return watchlist.MovieIds;
            }
            return new List<string>();
        }
    }
}
