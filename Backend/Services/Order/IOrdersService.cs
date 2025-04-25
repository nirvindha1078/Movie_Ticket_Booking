using Movie_Ticket.Models;

namespace Movie_Ticket.Services.Order
{
    public interface IOrdersService
    {
        Task<Orders> CreateOrderAsync(Orders order);  
        Task<List<Orders>> GetOrdersByUserIdAsync(string userId);  

        Task<List<Orders>> GetAllOrdersAsync();
    }
}
