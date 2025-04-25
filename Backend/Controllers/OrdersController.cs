using Microsoft.AspNetCore.Mvc;
using Movie_Ticket.Models;
using Movie_Ticket.Services.Order;

namespace Movie_Ticket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrdersService _orderService;

        public OrderController(IOrdersService orderService)
        {
            _orderService = orderService;
        }

        // POST: api/order
        [HttpPost]
        public async Task<ActionResult<Orders>> CreateOrder([FromBody] Orders order)
        {
            try
            {
                if (order == null)
                {
                    return BadRequest("Order data is missing.");
                }

                var createdOrder = await _orderService.CreateOrderAsync(order);
                return CreatedAtAction(nameof(CreateOrder), new { id = createdOrder.Id }, createdOrder);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // GET: api/order/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<List<Orders>>> GetOrdersByUserId(string userId)
        {
            try
            {
                var orders = await _orderService.GetOrdersByUserIdAsync(userId);

                if (orders == null || !orders.Any())
                {
                    return NotFound();
                }

                return Ok(orders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
