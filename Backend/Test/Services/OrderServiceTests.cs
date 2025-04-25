using Moq;
using NUnit.Framework;
using Movie_Ticket.Services.Order;
using Movie_Ticket.Repository.Order;
using Movie_Ticket.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Movie_Ticket.nUnitTests.Services.Order
{
    [TestFixture]
    public class OrdersServiceTests
    {
        private Mock<IOrdersRepository> _mockOrdersRepository;
        private OrdersService _ordersService;

        [SetUp]
        public void SetUp()
        {
            _mockOrdersRepository = new Mock<IOrdersRepository>();
            _ordersService = new OrdersService(_mockOrdersRepository.Object);
        }

        #region CreateOrderAsync Tests

        [Test]
        public async Task CreateOrderAsync_ShouldReturnCreatedOrder_WhenOrderIsCreatedSuccessfully()
        {
            // Arrange
            var newOrder = new Orders { Id = "1", UserId = "user1", TotalPrice = 100 };
            _mockOrdersRepository.Setup(repo => repo.CreateOrderAsync(It.IsAny<Orders>())).ReturnsAsync(newOrder);

            // Act
            var result = await _ordersService.CreateOrderAsync(newOrder);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("1", result.Id);
            Assert.AreEqual("user1", result.UserId);
        }

        [Test]
        public async Task CreateOrderAsync_ShouldReturnNull_WhenOrderCreationFails()
        {
            // Arrange
            _mockOrdersRepository.Setup(repo => repo.CreateOrderAsync(It.IsAny<Orders>())).ReturnsAsync((Orders)null);

            // Act
            var result = await _ordersService.CreateOrderAsync(new Orders { UserId = "user1", TotalPrice = 100 });

            // Assert
            Assert.IsNull(result);
        }

        #endregion

        #region GetOrdersByUserIdAsync Tests

        [Test]
        public async Task GetOrdersByUserIdAsync_ShouldReturnOrders_WhenOrdersExistForUser()
        {
            // Arrange
            var orders = new List<Orders>
            {
                new Orders { Id = "1", UserId = "user1", TotalPrice = 100 },
                new Orders { Id = "2", UserId = "user1", TotalPrice = 200 }
            };
            _mockOrdersRepository.Setup(repo => repo.GetOrdersByUserIdAsync("user1")).ReturnsAsync(orders);

            // Act
            var result = await _ordersService.GetOrdersByUserIdAsync("user1");

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual("user1", result[0].UserId);
        }

        [Test]
        public async Task GetOrdersByUserIdAsync_ShouldReturnEmptyList_WhenNoOrdersExistForUser()
        {
            // Arrange
            _mockOrdersRepository.Setup(repo => repo.GetOrdersByUserIdAsync("user2")).ReturnsAsync(new List<Orders>());

            // Act
            var result = await _ordersService.GetOrdersByUserIdAsync("user2");

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(0, result.Count);
        }

        #endregion

        #region GetAllOrdersAsync Tests

        [Test]
        public async Task GetAllOrdersAsync_ShouldReturnAllOrders_WhenOrdersExist()
        {
            // Arrange
            var orders = new List<Orders>
            {
                new Orders { Id = "1", UserId = "user1", TotalPrice = 100 },
                new Orders { Id = "2", UserId = "user2", TotalPrice = 200 }
            };
            _mockOrdersRepository.Setup(repo => repo.GetAllOrdersAsync()).ReturnsAsync(orders);

            // Act
            var result = await _ordersService.GetAllOrdersAsync();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
        }

        [Test]
        public async Task GetAllOrdersAsync_ShouldReturnEmptyList_WhenNoOrdersExist()
        {
            // Arrange
            _mockOrdersRepository.Setup(repo => repo.GetAllOrdersAsync()).ReturnsAsync(new List<Orders>());

            // Act
            var result = await _ordersService.GetAllOrdersAsync();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(0, result.Count);
        }

        #endregion
    }
}
