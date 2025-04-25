using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Movie_Ticket.Models
{
    public class Movie
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

        public string? Name { get; set; }
        public string? Language { get; set; }
        public string? Format { get; set; }
        public string? Genre { get; set; }
        public string? PosterUrl { get; set; }
        public string? RunTime { get; set; }
        public double Rating { get; set; }
        public string? TicketPrice { get; set; }
        public string? Status { get; set; }
    }
}

