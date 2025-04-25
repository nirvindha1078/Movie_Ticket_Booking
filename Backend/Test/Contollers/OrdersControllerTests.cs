using Moq;
using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using Movie_Ticket.Controllers;
using Movie_Ticket.Models;
using Movie_Ticket.Services.Order;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Movie_Ticket.Tests.Controllers
{
    [TestFixture]
    public class OrderControllerTests
    {
        private Mock<IOrdersService> _mockOrderService;
        private OrderController _controller;

        [SetUp]
        public void SetUp()
        {
            // Mock the IOrdersService
            _mockOrderService = new Mock<IOrdersService>();

            // Initialize the controller with the mocked service
            _controller = new OrderController(_mockOrderService.Object);
        }

        [Test]
        public async Task CreateOrder_ShouldReturnCreatedResult_WhenOrderIsCreated()
        {
            // Arrange
            var newOrder = new Orders
            {
                MovieId = "1",
                UserId = "123",
                TheaterId = "T1",
                Date = "2025-02-07",
                Time = "19:00",
                SeatsBooked = 2,
                TotalPrice = 30
            };

            // Mock CreateOrderAsync to return the same order with an Id
            _mockOrderService.Setup(service => service.CreateOrderAsync(It.IsAny<Orders>()))
                             .ReturnsAsync(new Orders
                             {
                                 Id = "abc123",
                                 MovieId = newOrder.MovieId,
                                 UserId = newOrder.UserId,
                                 TheaterId = newOrder.TheaterId,
                                 Date = newOrder.Date,
                                 Time = newOrder.Time,
                                 SeatsBooked = newOrder.SeatsBooked,
                                 TotalPrice = newOrder.TotalPrice
                             });

            // Act
            var result = await _controller.CreateOrder(newOrder);

            // Assert
            var actionResult = result as ActionResult<Orders>;
            Assert.NotNull(actionResult);

            var createdAtActionResult = actionResult.Result as CreatedAtActionResult;
            Assert.NotNull(createdAtActionResult);
            Assert.AreEqual(201, createdAtActionResult.StatusCode);

            var createdOrder = createdAtActionResult.Value as Orders;
            Assert.NotNull(createdOrder);
            Assert.AreEqual("abc123", createdOrder.Id);
        }


        [Test]
        public async Task CreateOrder_ShouldReturnBadRequest_WhenOrderIsNull()
        {
            // Arrange
            Orders newOrder = null;

            // Act
            var result = await _controller.CreateOrder(newOrder);

            // Assert
            var actionResult = result as ActionResult<Orders>;
            Assert.NotNull(actionResult);

            var badRequestResult = actionResult.Result as BadRequestObjectResult;
            Assert.NotNull(badRequestResult);
            Assert.AreEqual(400, badRequestResult.StatusCode);
            Assert.AreEqual("Order data is missing.", badRequestResult.Value);
        }

        [Test]
        public async Task GetOrdersByUserId_ShouldReturnOk_WhenOrdersExist()
        {
            // Arrange
            var userId = "123";
            var ordersList = new List<Orders>
    {
        new Orders { Id = "order1", MovieId = "1", UserId = userId, TheaterId = "T1", Date = "2025-02-07", Time = "19:00", SeatsBooked = 2, TotalPrice = 30 },
        new Orders { Id = "order2", MovieId = "2", UserId = userId, TheaterId = "T1", Date = "2025-02-08", Time = "20:00", SeatsBooked = 3, TotalPrice = 45 }
    };

            // Mock GetOrdersByUserIdAsync to return the orders list
            _mockOrderService.Setup(service => service.GetOrdersByUserIdAsync(userId))
                             .ReturnsAsync(ordersList);

            // Act
            var result = await _controller.GetOrdersByUserId(userId);

            // Assert
            var actionResult = result as ActionResult<List<Orders>>;
            Assert.NotNull(actionResult);

            var okResult = actionResult.Result as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);

            var orders = okResult.Value as List<Orders>;
            Assert.NotNull(orders);
            Assert.AreEqual(2, orders.Count);
            Assert.AreEqual("order1", orders[0].Id);
            Assert.AreEqual("order2", orders[1].Id);
        }


        [Test]
        public async Task GetOrdersByUserId_ShouldReturnNotFound_WhenNoOrdersExist()
        {
            // Arrange
            var userId = "nonexistent";
            _mockOrderService.Setup(service => service.GetOrdersByUserIdAsync(userId))
                             .ReturnsAsync(new List<Orders>());

            // Act
            var result = await _controller.GetOrdersByUserId(userId);

            // Assert
            var actionResult = result as ActionResult<List<Orders>>;
            Assert.NotNull(actionResult);

            var notFoundResult = actionResult.Result as NotFoundResult;
            Assert.NotNull(notFoundResult);
            Assert.AreEqual(404, notFoundResult.StatusCode);
        }

    }
}
