using Moq;
using NUnit.Framework;
using System.Threading.Tasks;
using Movie_Ticket.Repository.Users;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using System;
using Movie_Ticket.Requests;

namespace Movie_Ticket.nUnitTests.Services
{
    public class AuthServiceTests
    {
        private Mock<IUserRepository> _userRepositoryMock;
        private Mock<IOptions<AppSettings>> _appSettingsMock;
        private Mock<IConfiguration> _configurationMock;
        private AuthService _authService;

        [SetUp]
        public void Setup()
        {
            _userRepositoryMock = new Mock<IUserRepository>();
            _appSettingsMock = new Mock<IOptions<AppSettings>>();
            _configurationMock = new Mock<IConfiguration>();

            _appSettingsMock.Setup(x => x.Value).Returns(new AppSettings { JwtSecret = "secretkey" });

            _authService = new AuthService(_userRepositoryMock.Object, _appSettingsMock.Object, _configurationMock.Object);
        }

        [Test]
        public async Task AuthenticateAsync_ShouldReturnToken_WhenValidCredentials()
        {
            var email = "test@example.com";
            var password = "password123";
            var user = new User
            {
                Id = "1",
                Username = "testuser",
                Email = email,
                Password = "hashedpassword",
                Role = "User"
            };

            _userRepositoryMock.Setup(repo => repo.GetUserByEmailAsync(email)).ReturnsAsync(user);
            _authService = new AuthService(_userRepositoryMock.Object, _appSettingsMock.Object, _configurationMock.Object);

            var result = await _authService.AuthenticateAsync(email, password);

            Assert.IsNotNull(result, "The result should not be null.");
            var anonymousObject = result as dynamic;
            Assert.IsNotNull(anonymousObject.token, "The token should not be null.");
            Assert.AreEqual(user.Email, anonymousObject.user.Email, "The email in the result does not match the expected one.");
        }

        [Test]
        public async Task AuthenticateAsync_ShouldReturnNull_WhenInvalidCredentials()
        {
            var email = "invalid@example.com";
            var password = "wrongpassword";

            _userRepositoryMock.Setup(repo => repo.GetUserByEmailAsync(email)).ReturnsAsync((User)null);

            var result = await _authService.AuthenticateAsync(email, password);

            Assert.IsNull(result, "The result should be null for invalid credentials.");
        }

        [Test]
        public async Task RegisterAsync_ShouldReturnUserAndToken_WhenValidInput()
        {
            var authRequest = new AuthRequest
            {
                Username = "newuser",
                Email = "newuser@example.com",
                Password = "password123",
                PhoneNumber = "1234567890"
            };

            var newUser = new User
            {
                Id = "1",
                Username = authRequest.Username,
                Email = authRequest.Email,
                Role = "User",
                Password = "hashedpassword"
            };

            _userRepositoryMock.Setup(repo => repo.GetUserByEmailAsync(authRequest.Email)).ReturnsAsync((User)null);
            _userRepositoryMock.Setup(repo => repo.GetUserByUsernameAsync(authRequest.Username)).ReturnsAsync((User)null);
            _userRepositoryMock.Setup(repo => repo.CreateUserAsync(It.IsAny<User>())).Returns(Task.CompletedTask);

            var result = await _authService.RegisterAsync(authRequest);

            Assert.IsNotNull(result, "The result should not be null.");
            var anonymousObject = result as dynamic;
            Assert.IsNotNull(anonymousObject.token, "The token should not be null.");
            Assert.AreEqual(authRequest.Email, anonymousObject.user.Email, "The email in the result does not match the expected one.");
        }

        [Test]
        public async Task RegisterAsync_ShouldThrowException_WhenUserAlreadyExists()
        {
            var authRequest = new AuthRequest
            {
                Username = "existinguser",
                Email = "existinguser@example.com",
                Password = "password123",
                PhoneNumber = "1234567890"
            };

            var existingUser = new User
            {
                Id = "1",
                Username = "existinguser",
                Email = "existinguser@example.com",
                Password = "hashedpassword"
            };

            _userRepositoryMock.Setup(repo => repo.GetUserByEmailAsync(authRequest.Email)).ReturnsAsync(existingUser);

            var exception = Assert.ThrowsAsync<InvalidOperationException>(async () => await _authService.RegisterAsync(authRequest));
            Assert.AreEqual("User with this email already exists.", exception.Message, "The exception message should be 'User with this email already exists.'");
        }
    }
}
