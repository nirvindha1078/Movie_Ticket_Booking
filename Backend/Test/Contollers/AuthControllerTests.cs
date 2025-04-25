using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Movie_Ticket.Controllers;
using Movie_Ticket.Repository.Users;
using Movie_Ticket.Requests;
using NUnit.Framework;

namespace Movie_Ticket.nUnitTests.Controllers
{
    [TestFixture]
    public class AuthControllerTests
    {
        private Mock<AuthService> _authServiceMock;
        private AuthController _authController;

        [SetUp]
        public void SetUp()
        {
            _authServiceMock = new Mock<AuthService>();
            _authController = new AuthController(_authServiceMock.Object);
        }

        [Test]
        public async Task Login_WithValidCredentials_ReturnsOkResult()
        {
            // Arrange
            var loginRequest = new LoginRequest { Email = "test@example.com", Password = "password" };
            _authServiceMock.Setup(service => service.AuthenticateAsync(loginRequest.Email, loginRequest.Password))
                .ReturnsAsync(new { Token = "valid_token" });

            // Act
            var result = await _authController.Login(loginRequest);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task Login_WithInvalidCredentials_ReturnsUnauthorizedResult()
        {
            // Arrange
            var loginRequest = new LoginRequest { Email = "test@example.com", Password = "wrong_password" };
            _authServiceMock.Setup(service => service.AuthenticateAsync(loginRequest.Email, loginRequest.Password))
                .ReturnsAsync((object)null);

            // Act
            var result = await _authController.Login(loginRequest);

            // Assert
            Assert.IsInstanceOf<UnauthorizedObjectResult>(result);
        }

        [Test]
        public async Task Register_WithValidRequest_ReturnsOkResult()
        {
            // Arrange
            var authRequest = new AuthRequest { Email = "test@example.com", Password = "password" };
            _authServiceMock.Setup(service => service.RegisterAsync(authRequest))
                .ReturnsAsync(new { Success = true });

            // Act
            var result = await _authController.Register(authRequest);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task Register_WithException_ReturnsBadRequestResult()
        {
            // Arrange
            var authRequest = new AuthRequest { Email = "test@example.com", Password = "password" };
            _authServiceMock.Setup(service => service.RegisterAsync(authRequest))
                .ThrowsAsync(new System.Exception("Registration failed"));

            // Act
            var result = await _authController.Register(authRequest);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }
    }
}