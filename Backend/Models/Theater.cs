using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

public class Theater
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string  Id { get; set; } = ObjectId.GenerateNewId().ToString();
    public string? Name { get; set; }
    public string? Address { get; set; }
    public List<TimeSlot>? TimeSlots { get; set; }

    [BsonElement("movieIds")]
    public List<string> MovieIds { get; set; } = new List<string>();
}

public class TimeSlot
{
    public string? Id { get; set; } 
    public string? Time { get; set; }  

    public int AvailableSeats { get; set; }
}
