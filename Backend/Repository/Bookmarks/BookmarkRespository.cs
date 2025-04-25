using MongoDB.Driver;
using Movie_Ticket.Models;
using System.Diagnostics.CodeAnalysis;

namespace Movie_Ticket.Repository.Bookmarks
{
    [ExcludeFromCodeCoverage]
    public class BookmarkRepository : IBookmarkRepository
    {
        private readonly IMongoCollection<Bookmark> _bookmarkCollection;

        public BookmarkRepository(IMongoDbContext context)
        {
            _bookmarkCollection = context.Bookmark;
        }

        public async Task<Bookmark> GetBookmarkByUserIdAsync(string userId)
        {
            return await _bookmarkCollection.Find(b => b.UserId == userId).FirstOrDefaultAsync();
        }

        public async Task<bool> AddMovieToBookmarkAsync(string movieId, string userId)
        {
            var bookmark = await GetBookmarkByUserIdAsync(userId);

            if (bookmark == null)
            {
                bookmark = new Bookmark
                {
                    UserId = userId,
                    MovieIds = new List<string> { movieId }
                };
                await _bookmarkCollection.InsertOneAsync(bookmark);
            }
            else
            {
                if (!bookmark.MovieIds.Contains(movieId))
                {
                    bookmark.MovieIds.Add(movieId);
                    var update = Builders<Bookmark>.Update.Set(b => b.MovieIds, bookmark.MovieIds);
                    await _bookmarkCollection.UpdateOneAsync(b => b.UserId == userId, update);
                }
            }
            return true;
        }

        public async Task<bool> RemoveMovieFromBookmarkAsync(string movieId, string userId)
        {
            var bookmark = await GetBookmarkByUserIdAsync(userId);

            if (bookmark == null || !bookmark.MovieIds.Contains(movieId))
            {
                return false;
            }

            bookmark.MovieIds.Remove(movieId);
            var update = Builders<Bookmark>.Update.Set(b => b.MovieIds, bookmark.MovieIds);
            await _bookmarkCollection.UpdateOneAsync(b => b.UserId == userId, update);

            return true;
        }
    }
}
