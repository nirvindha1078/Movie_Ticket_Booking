using Microsoft.AspNetCore.Mvc;
using Movie_Ticket.Services.Bookmarks;

namespace Movie_Ticket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private readonly IBookmarkService _bookmarkService;

        public BookmarkController(IBookmarkService bookmarkService)
        {
            _bookmarkService = bookmarkService;
        }

        // POST: api/bookmark?
        [HttpPost]
        public async Task<IActionResult> AddToBookmark(string movieId, string userId)
        {
            try
            {
                var result = await _bookmarkService.AddMovieToBookmark(movieId, userId);
                if (result)
                {
                    return Ok("Movie added to bookmark.");
                }
                return BadRequest("Failed to add movie");
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/bookmark?
        [HttpDelete]
        public async Task<IActionResult> RemoveFromBookmark(string movieId, string userId)
        {
            try
            {
                var result = await _bookmarkService.RemoveMovieFromBookmark(movieId, userId);
                if (result)
                {
                    return Ok("Movie removed from bookmark.");
                }
                return BadRequest("Failed to remove movie from bookmark.");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/bookmark?
        [HttpGet]
        public async Task<IActionResult> GetBookmark(string userId)
        {
            try
            {
                var movies = await _bookmarkService.GetBookmarkByUserId(userId);
                return Ok(movies);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
