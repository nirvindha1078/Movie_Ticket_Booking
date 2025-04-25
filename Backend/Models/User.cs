﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
    public string? Username { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }

    public string Role = "User";
    public string? BookmarkIds { get; set; } = ObjectId.GenerateNewId().ToString();

    public string WatchlistIds { get; set; } = ObjectId.GenerateNewId().ToString();

   // public string IdString => Id.ToString();
}
