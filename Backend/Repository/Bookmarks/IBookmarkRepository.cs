using Movie_Ticket.Models;

namespace Movie_Ticket.Repository.Bookmarks
{
    public interface IBookmarkRepository
    {
        Task<Bookmark> GetBookmarkByUserIdAsync(string userId);
        Task<bool> AddMovieToBookmarkAsync(string movieId, string userId);
        Task<bool> RemoveMovieFromBookmarkAsync(string movieId, string userId);
    }
}
