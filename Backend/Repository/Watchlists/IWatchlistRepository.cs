using Movie_Ticket.Models;

namespace Movie_Ticket.Repository.Watchlists
{
    public interface IWatchlistRepository
    {
        Task<Watchlist> GetWatchlistByUserIdAsync(string userId);
        Task<bool> AddMovieToWatchlistAsync(string movieId, string userId);
        Task<bool> RemoveMovieFromWatchlistAsync(string movieId, string userId);
    }
}
