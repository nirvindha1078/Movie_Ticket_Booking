using Movie_Ticket.Models;

namespace Movie_Ticket.Repository.Order
{
    public interface IOrdersRepository
    {
        Task<Orders> CreateOrderAsync(Orders order);
        Task<List<Orders>> GetOrdersByUserIdAsync(string userId);

        Task<List<Orders>> GetAllOrdersAsync();
    }
}
