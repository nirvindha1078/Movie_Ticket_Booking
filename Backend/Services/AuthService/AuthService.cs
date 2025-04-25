using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Konscious.Security.Cryptography;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text.RegularExpressions;
using Movie_Ticket.Repository.Users;
using Movie_Ticket.Requests;

public class AuthService
{
    private readonly IUserRepository _userRepository;
    private readonly string _jwtSecret;
    private readonly IConfiguration _configuration;


    public AuthService(IUserRepository userRepository, IOptions<AppSettings> appSettings, IConfiguration configuration)
    {
        _configuration = configuration;
        _userRepository = userRepository;
        _jwtSecret = appSettings.Value.JwtSecret;
        if (string.IsNullOrEmpty(_jwtSecret))
        {
            throw new ArgumentNullException("JwtSecret", "JWT secret key cannot be null or empty.");
        }
    }

    public async Task<object> AuthenticateAsync(string email, string password)
    {
        var user = await _userRepository.GetUserByEmailAsync(email);
        if (user == null || !VerifyPassword(user.Password, password))
        {
            return null;
        }

        string token = user.Role == "Admin" ? GenerateJwtTokenAdmin(user.Email) : GenerateJwtToken(user);

        return new
        {
            token,
            user = new
            {
                user.Id,
                user.Username,
                user.Email,
                user.Role
            },
        };
    }


    public async Task<object> RegisterAsync(AuthRequest authRequest)
    {
        ValidateUserInput(authRequest);

        var existingUser = await _userRepository.GetUserByEmailAsync(authRequest.Email);
        if (existingUser != null)
        {
            throw new InvalidOperationException("User with this email already exists.");
        }

        var existingUsername = await _userRepository.GetUserByUsernameAsync(authRequest.Username);
        if (existingUsername != null)
        {
            throw new InvalidOperationException("Username already taken.");
        }

        var hashedPassword = HashPassword(authRequest.Password);

        var newUser = new User
        {
            Username = authRequest.Username,
            PhoneNumber = authRequest.PhoneNumber,
            Email = authRequest.Email,
            Password = hashedPassword
        };

        await _userRepository.CreateUserAsync(newUser);

        string token = GenerateJwtToken(newUser);

        return new
        {
            user = new
            {
                newUser.Id,
                newUser.Username,
                newUser.Email,
                newUser.Role
            },
            token
        };
    }


    private string GenerateJwtTokenAdmin(string email)
    {
        var claims = new[]
        {
                new Claim(ClaimTypes.Name, email),
                new Claim(ClaimTypes.Role, "Admin")
            };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:JwtSecret"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["JwtSettings:JwtIssuer"],
            audience: _configuration["JwtSettings:JwtAudience"],
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    // Method to generate JWT token after successful authentication
    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: "Movie_Ticket",
            audience: "movie_ticket",
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    // Method to hash the password using Argon2
    public string HashPassword(string password)
    {
        byte[] salt = GenerateSalt();  
        using (var hasher = new Argon2d(Encoding.UTF8.GetBytes(password)))
        {
            hasher.Salt = salt;
            hasher.DegreeOfParallelism = 4;  
            hasher.MemorySize = 128 * 128;  
            hasher.Iterations = 4;

            byte[] hash = hasher.GetBytes(32); 
            return Convert.ToBase64String(salt) + ":" + Convert.ToBase64String(hash);  
        }
    }

    // Method to verify the password during authentication
    private bool VerifyPassword(string storedHash, string password)
    {
        var parts = storedHash.Split(':');
        byte[] salt = Convert.FromBase64String(parts[0]);
        byte[] storedHashBytes = Convert.FromBase64String(parts[1]);

        using (var hasher = new Argon2d(Encoding.UTF8.GetBytes(password)))
        {
            hasher.Salt = salt;
            hasher.DegreeOfParallelism = 4; 
            hasher.MemorySize = 128 * 128;  
            hasher.Iterations = 4; 

            byte[] hash = hasher.GetBytes(32);  

            return hash.Length == storedHashBytes.Length && !hash.Where((t, i) => t != storedHashBytes[i]).Any();
        }
    }

    // Method to generate a random salt
    private byte[] GenerateSalt()
    {
        byte[] salt = new byte[16];  
        using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }
        return salt;
    }

    // Method to validate the user's input
    private void ValidateUserInput(AuthRequest authRequest)
    {
        if (!IsValidEmail(authRequest.Email))
        {
            throw new ArgumentException("Invalid email format.");
        }

        if (!IsValidPhoneNumber(authRequest.PhoneNumber))
        {
            throw new ArgumentException("Invalid phone number format.");
        }

        if (string.IsNullOrWhiteSpace(authRequest.Username))
        {
            throw new ArgumentException("Username is required.");
        }

        if (string.IsNullOrWhiteSpace(authRequest.Password) || authRequest.Password.Length < 6)
        {
            throw new ArgumentException("Password must be at least 6 characters long.");
        }
    }

    // Method to validate email format
    private bool IsValidEmail(string email)
    {
        var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
        return emailRegex.IsMatch(email);
    }

    // Method to validate phone number format
    private bool IsValidPhoneNumber(string phoneNumber)
    {
        var phoneRegex = new Regex(@"^\d{10}$");
        return phoneRegex.IsMatch(phoneNumber);
    }
}
