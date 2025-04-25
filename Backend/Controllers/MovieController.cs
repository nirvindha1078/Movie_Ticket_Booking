using Microsoft.AspNetCore.Mvc;
using Movie_Ticket.Models;
using Movie_Ticket.Services.Movies;

[Route("api/[controller]")]
[ApiController]
public class MovieController : ControllerBase
{
    private readonly IMovieService _movieService;

    public MovieController(IMovieService movieService)
    {
        _movieService = movieService;
    }

    // GET: api/movie/filter 
    [HttpGet("filter")]
    public async Task<ActionResult> GetMoviesByFilters([FromQuery] string? language = null, [FromQuery] string? format = null, [FromQuery] string? genre = null)
    {
        try
        {
            var movies = await _movieService.GetMoviesByFilterAsync(language, format, genre);

            if (movies == null || movies.Count == 0)
            {
                return Ok(new { message = "No Movies Found" });
            }

            return Ok(movies);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // GET: api/movie/ids 
    [HttpGet("ids")]
    public async Task<ActionResult<IEnumerable<Movie>>> GetMoviesByIds([FromQuery] List<string>? movieIds = null)
    {
        try
        {
            if (movieIds == null || movieIds.Count == 0)
            {
                var allMovies = await _movieService.GetAllMoviesAsync();
                if (allMovies == null || allMovies.Count == 0)
                {
                    return Ok(new { message = "No Movies Found" });
                }
                return Ok(allMovies);
            }

            var movies = await _movieService.GetMovieByIdsAsync(movieIds);

            if (movies == null || movies.Count == 0)
            {
                return NotFound("Movies not found.");
            }

            return Ok(movies);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}

