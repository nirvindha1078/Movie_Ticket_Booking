using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace Movie_Ticket.Models
{
    public class Orders
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
        public string? MovieId { get; set; }  
        public string? UserId { get; set; } 
        public string? TheaterId { get; set; } 
        public string? Date { get; set; }  
        public string? Time { get; set; }  
        public int SeatsBooked { get; set; }  
        public int TotalPrice { get; set; }  
    }
}
