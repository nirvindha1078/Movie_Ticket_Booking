using Microsoft.AspNetCore.Mvc;
using Movie_Ticket.Requests;

namespace Movie_Ticket.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        // POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                var result = await _authService.AuthenticateAsync(loginRequest.Email, loginRequest.Password);

                if (result == null)
                {
                    return Unauthorized("Invalid credentials");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AuthRequest authRequest)
        {
            try
            {
                var result=await _authService.RegisterAsync(authRequest);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

