using MongoDB.Driver;
using Movie_Ticket.Models;

public class MongoDbContext : IMongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IConfiguration configuration)
    {
        var connectionString = configuration.GetValue<string>("MongoSettings:ConnectionString");
        var databaseName = configuration.GetValue<string>("MongoSettings:DatabaseName");

        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

    public IMongoCollection<User> Users => _database.GetCollection<User>("users");
    public IMongoCollection<Theater> Theaters => _database.GetCollection<Theater>("theaters");
    public IMongoCollection<Movie> Movies => _database.GetCollection<Movie>("movies");
    public IMongoCollection<Orders> Orders => _database.GetCollection<Orders>("orders");
    public IMongoCollection<Watchlist> Watchlist => _database.GetCollection<Watchlist>("watchlist");
    public IMongoCollection<Bookmark> Bookmark => _database.GetCollection<Bookmark>("bookmark");
    public IMongoDatabase Database => _database;
}

