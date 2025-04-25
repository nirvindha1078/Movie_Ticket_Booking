using System.Globalization;
using MongoDB.Driver;
using Movie_Ticket.Models;
using System.Diagnostics.CodeAnalysis;
namespace Movie_Ticket.Repository.Order
{
    [ExcludeFromCodeCoverage]
    public class OrdersRepository : IOrdersRepository
    {
        private readonly IMongoCollection<Orders> _ordersCollection;

        public OrdersRepository(IMongoDbContext context)
        {
            _ordersCollection = context.Orders;
        }

        public async Task<Orders> CreateOrderAsync(Orders order)
        {
            if (!DateTime.TryParseExact(order.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime orderDate))
            {
                throw new InvalidOperationException("The date format is invalid. Please use 'yyyy-MM-dd'.");
            }

            DateTime orderDateTime;
            try
            {
                orderDateTime = DateTime.ParseExact(order.Time, "h:mm tt", CultureInfo.InvariantCulture);
            }
            catch (FormatException)
            {
                throw new InvalidOperationException("The time format is invalid. Please use 'h:mm tt' format.");
            }

            orderDateTime = orderDate.Date.Add(orderDateTime.TimeOfDay); 

            DateTime currentDateTime = DateTime.Now;

            if (orderDateTime.Date < currentDateTime.Date)
            {
                throw new InvalidOperationException("The order date cannot be in the past.");
            }

            if (orderDateTime.Date == currentDateTime.Date && orderDateTime.TimeOfDay < currentDateTime.TimeOfDay)
            {
                throw new InvalidOperationException("The order time has already passed.");
            }

            if (orderDateTime > currentDateTime.AddDays(5))
            {
                throw new InvalidOperationException("The order date cannot be more than 5 days in the future.");
            }

            order.Date = orderDateTime.ToString("yyyy-MM-dd");
            await _ordersCollection.InsertOneAsync(order);
            return order;
        }

        public async Task<List<Orders>> GetOrdersByUserIdAsync(string userId)
        {
            var filter = Builders<Orders>.Filter.Eq(o => o.UserId, userId);
            return await _ordersCollection.Find(filter).ToListAsync();
        }

        public async Task<List<Orders>> GetAllOrdersAsync()
        {
            var filter = Builders<Orders>.Filter.Empty;
            return await _ordersCollection.Find(filter).ToListAsync();
        }
    }

}

