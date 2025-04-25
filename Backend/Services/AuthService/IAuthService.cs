using Movie_Ticket.Requests;

namespace Movie_Ticket.Services.AuthService
{
    public interface IAuthService
    {
        Task<object> AuthenticateAsync(string email, string password);
        Task<object> RegisterAsync(AuthRequest authRequest);
        string HashPassword(string password);
        bool VerifyPassword(string storedHash, string password);
    }

}
