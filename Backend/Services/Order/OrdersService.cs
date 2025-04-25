using Movie_Ticket.Models;
using Movie_Ticket.Repository.Order;

namespace Movie_Ticket.Services.Order
{
    public class OrdersService : IOrdersService
    {
        private readonly IOrdersRepository _orderRepository;

        public OrdersService(IOrdersRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<Orders> CreateOrderAsync(Orders order)
        {

            return await _orderRepository.CreateOrderAsync(order);
        }

        public async Task<List<Orders>> GetOrdersByUserIdAsync(string userId)
        {
            return await _orderRepository.GetOrdersByUserIdAsync(userId);
        }

        public async Task<List<Orders>> GetAllOrdersAsync()
        {
            return await _orderRepository.GetAllOrdersAsync();
        }
    }
}
