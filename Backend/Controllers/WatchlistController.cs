using Microsoft.AspNetCore.Mvc;
using Movie_Ticket.Services.Watchlists;

namespace Movie_Ticket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WatchlistController : ControllerBase
    {
        private readonly IWatchlistService _watchlistService;

        public WatchlistController(IWatchlistService watchlistService)
        {
            _watchlistService = watchlistService;
        }

        // POST: api/watchlist?
        [HttpPost]
        public async Task<IActionResult> AddToWatchlist(string movieId, string userId)
        {
            try
            {
                var result = await _watchlistService.AddMovieToWatchlist(movieId, userId);
                if (result)
                {
                    return Ok("Movie added to watchlist.");
                }
                return BadRequest("Failed to add movie to watchlist.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        // DELETE: api/watchlist?
        [HttpDelete]
        public async Task<IActionResult> RemoveFromWatchlist(string movieId, string userId)
        {
            try
            {
                var result = await _watchlistService.RemoveMovieFromWatchlist(movieId, userId);
                if (result)
                {
                    return Ok("Movie removed from watchlist.");
                }
                return BadRequest("Failed to remove movie from watchlist.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/watchlist?
        [HttpGet]
        public async Task<IActionResult> GetWatchlist(string userId)
        {
            try
            {
                var movies = await _watchlistService.GetWatchlistByUserId(userId);
                return Ok(movies);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
