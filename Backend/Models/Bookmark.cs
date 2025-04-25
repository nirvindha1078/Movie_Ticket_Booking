using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Movie_Ticket.Models
{
    public class Bookmark
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("userId")]
        public string  UserId { get; set; }

        [BsonElement("movieIds")]
        public List<string> MovieIds { get; set; } = new List<string>();
    }
}
