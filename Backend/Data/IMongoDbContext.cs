using MongoDB.Driver;
using Movie_Ticket.Models;

public interface IMongoDbContext
{
    IMongoDatabase Database { get; }
    IMongoCollection<User> Users { get; }
    IMongoCollection<Movie>? Movies { get; }
    IMongoCollection<Theater> Theaters { get; }
    IMongoCollection<Orders> Orders { get; }
    IMongoCollection<Watchlist> Watchlist { get; }

    IMongoCollection<Bookmark> Bookmark { get; }
}
