﻿namespace Movie_Ticket.Requests
{
    public class AuthRequest
    {
        public string? Username { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
