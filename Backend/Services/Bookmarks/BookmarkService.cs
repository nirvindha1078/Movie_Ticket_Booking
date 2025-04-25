using Movie_Ticket.Repository.Bookmarks;

namespace Movie_Ticket.Services.Bookmarks
{
    public class BookmarkService : IBookmarkService
    {
        private readonly IBookmarkRepository _bookmarkRepository;

        public BookmarkService(IBookmarkRepository bookmarkRepository)
        {
            _bookmarkRepository = bookmarkRepository;
        }

        public async Task<bool> AddMovieToBookmark(string movieId, string userId)
        {
            return await _bookmarkRepository.AddMovieToBookmarkAsync(movieId, userId);
        }

        public async Task<bool> RemoveMovieFromBookmark(string movieId, string userId)
        {
            return await _bookmarkRepository.RemoveMovieFromBookmarkAsync(movieId, userId);
        }

        public async Task<List<string>> GetBookmarkByUserId(string userId)
        {
            var bookmark = await _bookmarkRepository.GetBookmarkByUserIdAsync(userId);
            if (bookmark != null)
            {
                return bookmark.MovieIds;
            }
            return new List<string>();
        }
    }
}
