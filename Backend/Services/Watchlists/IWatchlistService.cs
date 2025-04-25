namespace Movie_Ticket.Services.Watchlists
{
    public interface IWatchlistService
    {
        Task<bool> AddMovieToWatchlist(string movieId, string userId);
        Task<bool> RemoveMovieFromWatchlist(string movieId, string userId);
        Task<List<string>> GetWatchlistByUserId(string userId); 
    }
}
