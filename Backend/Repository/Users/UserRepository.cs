using MongoDB.Driver;
using MongoDB.Bson;
using System.Diagnostics.CodeAnalysis;

namespace Movie_Ticket.Repository.Users
{
    [ExcludeFromCodeCoverage]
    public class UserRepository : IUserRepository
    {

        private readonly IMongoCollection<User> _userCollection;

        public UserRepository(IMongoDbContext context)
        {
            _userCollection = context.Users;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _userCollection.Find(user => user.Email == email).FirstOrDefaultAsync();
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _userCollection.Find(user => user.Username == username).FirstOrDefaultAsync();
        }

        public async Task CreateUserAsync(User user)
        {
            user.BookmarkIds = ObjectId.GenerateNewId().ToString();
            user.WatchlistIds = ObjectId.GenerateNewId().ToString();
            await _userCollection.InsertOneAsync(user);
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _userCollection.Find(_ => true).ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(string id)
        {
            return await _userCollection.Find(user => user.Id == id).FirstOrDefaultAsync();
        }


    }
}
