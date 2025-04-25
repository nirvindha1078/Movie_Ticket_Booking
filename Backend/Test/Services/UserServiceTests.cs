using Moq;
using NUnit.Framework;
using Movie_Ticket.Models;
using Movie_Ticket.Repository.Users;
using Movie_Ticket.Services.Userss;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Movie_Ticket.nUnitTests.Services
{
    [TestFixture]
    public class UserServiceTests
    {
        private Mock<IUserRepository> _mockUserRepository;
        private UserService _userService;

        [SetUp]
        public void SetUp()
        {
            _mockUserRepository = new Mock<IUserRepository>();
            _userService = new UserService(_mockUserRepository.Object);
        }

        #region GetAllUsersAsync Tests

        [Test]
        public async Task GetAllUsersAsync_ShouldReturnListOfUsers_WhenUsersExist()
        {
            // Arrange
            var users = new List<User>
            {
                new User { Id = "1", Username = "User1", Email = "user1@example.com" },
                new User { Id = "2", Username = "User2", Email = "user2@example.com" }
            };
            _mockUserRepository.Setup(repo => repo.GetAllUsersAsync()).ReturnsAsync(users);

            // Act
            var result = await _userService.GetAllUsersAsync();

            // Assert
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual("User1", result[0].Username);
            Assert.AreEqual("User2", result[1].Username);
        }

        [Test]
        public async Task GetAllUsersAsync_ShouldReturnEmptyList_WhenNoUsersExist()
        {
            // Arrange
            var users = new List<User>();
            _mockUserRepository.Setup(repo => repo.GetAllUsersAsync()).ReturnsAsync(users);

            // Act
            var result = await _userService.GetAllUsersAsync();

            // Assert
            Assert.AreEqual(0, result.Count);
        }

        #endregion

        #region GetUserByIdAsync Tests

        [Test]
        public async Task GetUserByIdAsync_ShouldReturnUser_WhenUserExists()
        {
            // Arrange
            var userId = "1";
            var user = new User { Id = userId, Username = "TestUser", Email = "testuser@example.com" };
            _mockUserRepository.Setup(repo => repo.GetUserByIdAsync(userId)).ReturnsAsync(user);

            // Act
            var result = await _userService.GetUserByIdAsync(userId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("TestUser", result.Username);
        }

        [Test]
        public async Task GetUserByIdAsync_ShouldReturnNull_WhenUserDoesNotExist()
        {
            // Arrange
            var userId = "1";
            _mockUserRepository.Setup(repo => repo.GetUserByIdAsync(userId)).ReturnsAsync((User)null);

            // Act
            var result = await _userService.GetUserByIdAsync(userId);

            // Assert
            Assert.IsNull(result);
        }

        #endregion
    }
}
