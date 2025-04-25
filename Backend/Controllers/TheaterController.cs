using Microsoft.AspNetCore.Mvc;
using Movie_Ticket.Requests;
using Movie_Ticket.Models;
using Movie_Ticket.Services;

namespace MovieBookingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TheaterController : ControllerBase
    {
        private readonly ITheaterService _theaterService;

        public TheaterController(ITheaterService theaterService)
        {
            _theaterService = theaterService;
        }

        // GET: api/Theater 
        [HttpGet("ids")]
        public async Task<IActionResult> GetTheater( [FromQuery] List<string> theaterIds = null)
        {
            try
            {
                if (theaterIds != null && theaterIds.Count > 0)
                {
                    var theaters = await _theaterService.GetTheatersByIdsAsync(theaterIds);
                    if (theaters == null || theaters.Count == 0)
                    {
                        return NotFound("Theaters not found.");
                    }
                    return Ok(theaters);
                }

                var allTheaters = await _theaterService.GetAllTheatersAsync();
                return Ok(allTheaters);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Theater (Create a new theater)
        [HttpPost]
        public async Task<IActionResult> CreateTheater([FromBody] Theater theater)
        {
            try
            {
                if (theater == null)
                {
                    return BadRequest("Theater data is required.");
                }

                var createdTheater = await _theaterService.CreateTheaterAsync(theater);
                return CreatedAtAction(nameof(GetTheater), new { id = createdTheater.Id }, createdTheater);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Theater/{id} 
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTheater(string id, [FromBody] Theater theater)
        {
            try
            {
                if (theater == null || theater.Id != id)
                {
                    return BadRequest("Theater data is incorrect.");
                }

                var updatedTheater = await _theaterService.UpdateTheaterAsync(id, theater);
                if (updatedTheater == null)
                {
                    return NotFound();
                }

                return Ok(updatedTheater);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Theater/{id} 
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTheater(string id)
        {
            try
            {
                var result = await _theaterService.DeleteTheaterAsync(id);
                if (!result)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PATCH: api/Theater/{theaterId}/timeslot 
        [HttpPatch("{theaterId}/timeslot")]
        public async Task<IActionResult> UpdateAvailableSeats(string theaterId,[FromQuery] string time,[FromBody] TimeSlotUpdateRequest request)
        {
            try
            {
                if (request.SeatsBooked <= 0)
                {
                    return BadRequest("Seats booked should be greater than zero.");
                }

                var updatedSeats = await _theaterService.UpdateAvailableSeatsAsync(theaterId, time, request.SeatsBooked);

                if (updatedSeats)
                {
                    return Ok("Seats updated successfully.");
                }
                return NotFound("Theater or Time Slot not found.");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Theater/GetTheaterIdsByMovieId/{movieId} 
        [HttpGet("GetTheaterIdsByMovieId/{movieId}")]
        public async Task<ActionResult<List<string>>> GetTheaterIdsByMovieIdAsync(string movieId)
        {
            try
            {
                var theaterIds = await _theaterService.GetTheaterIdsByMovieIdAsync(movieId);
                if (theaterIds == null || theaterIds.Count == 0)
                {
                    return NotFound(new { message = "No theaters found for the given movie." });
                }

                return Ok(theaterIds);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
