using Microsoft.AspNetCore.Mvc;
using Movie_Ticket.Models;
using Microsoft.AspNetCore.Authorization;
using Movie_Ticket.Models.DTOs;
using Movie_Ticket.Services.Movies;
using Movie_Ticket.Services.Order;

namespace Movie_Ticket.Controllers
{
    [Route("api/admin/[controller]")] 
    [ApiController]
    [Authorize(Roles = "Admin")]  
    public class AdminDashboardController : ControllerBase
    {
        private readonly IMovieService _movieService;
        private readonly IImageService _imageService;
        private readonly IUserService _userService;
        private readonly IOrdersService _ordersService;
        private readonly ITheaterService _theaterService;
        public AdminDashboardController(
            IMovieService movieService,
            IImageService imageService,
            IUserService userService,
            IOrdersService ordersService,
            ITheaterService theaterService)
        {
            _movieService = movieService;
            _imageService = imageService;
            _userService = userService;
            _ordersService = ordersService;
            _theaterService = theaterService;
        }

        // POST: api/admin/movie
        [HttpPost]
        public async Task<IActionResult> CreateMovie([FromForm] MovieDto movieDto)
        {
            try
            {
                if (movieDto.ImageFile != null && movieDto.ImageFile.Length > 0)
                {
                    string base64Image = await _imageService.SaveImageAsync(movieDto.ImageFile);

                    var movie = new Movie
                    {
                        Name = movieDto.Name,
                        Language = movieDto.Language,
                        Format = movieDto.Format,
                        Genre = movieDto.Genre,
                        RunTime = movieDto.RunTime,
                        Rating = movieDto.Rating,
                        TicketPrice = movieDto.TicketPrice,
                        PosterUrl = base64Image,
                        Status = movieDto.Status
                    };

                    var createdMovie = await _movieService.CreateMovieAsync(movie);
                    return Ok(createdMovie); 
                }

                return BadRequest("Image is required.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // DELETE: api/admin/movie/{id}
        [HttpDelete("movie/{id}")]
        public async Task<IActionResult> DeleteMovie(string id)
        {
            try
            {
                var movie = await _movieService.GetMovieByIdAsync(id);
                if (movie == null)
                {
                    return NotFound();
                }

                await _movieService.DeleteMovieAsync(id);
                return NoContent();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // PUT: api/movie/updatestatus/{id}
        [HttpPut("updatestatus/{id}")]
        public async Task<IActionResult> UpdateMovieStatus(string id, [FromQuery] string status)
        {
            try
            {
                await _movieService.UpdateMovieStatusAsync(id, status);
                return Ok(new { message = "Movie status updated successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("users")]
        public async Task<ActionResult> GetUsersOrUserById(string? id = null)
        {
            try
            {
                if (string.IsNullOrEmpty(id))
                {
                    var users = await _userService.GetAllUsersAsync();
                    return Ok(users);
                }
                else
                {
                    var user = await _userService.GetUserByIdAsync(id);
                    if (user == null)
                        return NotFound();
                    return Ok(user);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // GET: api/order
        [HttpGet("orders")]
        public async Task<ActionResult<List<Orders>>> GetAllOrders()
        {
            try
            {
                var orders = await _ordersService.GetAllOrdersAsync();
                return Ok(orders);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("addmovietotheater")]
        public async Task<IActionResult> AddMovieToTheater([FromQuery] string theaterId, [FromQuery] string movieId)
        {
            try
            {
                if (string.IsNullOrEmpty(theaterId) || string.IsNullOrEmpty(movieId))
                {
                    return BadRequest("Theater ID and Movie ID are required.");
                }

                var updatedTheater = await _theaterService.AddMovieToTheaterAsync(theaterId, movieId);

                if (updatedTheater == null)
                {
                    return NotFound("Theater not found.");
                }

                return Ok(updatedTheater);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred: {ex.Message}");
            }
        }
    }
}
