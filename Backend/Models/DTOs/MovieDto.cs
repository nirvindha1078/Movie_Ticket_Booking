namespace Movie_Ticket.Models.DTOs
{
    public class MovieDto
    {
            public string Name { get; set; }
            public string Language { get; set; }
            public string Format { get; set; }
            public string Genre { get; set; }
            public string RunTime { get; set; }
            public double Rating { get; set; }
            public string TicketPrice { get; set; }
            public IFormFile ImageFile { get; set; }

             public string Status { get; set; }
        

    }
}
