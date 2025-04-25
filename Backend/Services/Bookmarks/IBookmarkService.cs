namespace Movie_Ticket.Services.Bookmarks
{
    public interface IBookmarkService
    {
        Task<bool> AddMovieToBookmark(string movieId, string userId);
        Task<bool> RemoveMovieFromBookmark(string movieId, string userId);
        Task<List<string>> GetBookmarkByUserId(string userId); 
    }
}
