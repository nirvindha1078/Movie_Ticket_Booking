using Moq;
using Microsoft.AspNetCore.Mvc;
using Movie_Ticket.Controllers;
using Movie_Ticket.Models.DTOs;
using Movie_Ticket.Models;
using Movie_Ticket.Services.Movies;
using Movie_Ticket.Services.Order;
using Microsoft.AspNetCore.Http;

namespace Movie_Ticket.Tests.Controllers
{
    public class AdminDashboardControllerTests
    {
        private Mock<IMovieService> _movieServiceMock;
        private Mock<IImageService> _imageServiceMock;
        private Mock<IUserService> _userServiceMock;
        private Mock<IOrdersService> _ordersServiceMock;
        private Mock<ITheaterService> _theaterServiceMock;
        private AdminDashboardController _controller;

        [SetUp]
        public void Setup()
        {
            _movieServiceMock = new Mock<IMovieService>();
            _imageServiceMock = new Mock<IImageService>();
            _userServiceMock = new Mock<IUserService>();
            _ordersServiceMock = new Mock<IOrdersService>();
            _theaterServiceMock = new Mock<ITheaterService>();

            _controller = new AdminDashboardController(
                _movieServiceMock.Object,
                _imageServiceMock.Object,
                _userServiceMock.Object,
                _ordersServiceMock.Object,
                _theaterServiceMock.Object
            );
        }

        [Test]
        public async Task CreateMovie_ShouldReturnOk_WhenMovieIsCreated()
        {
            // Arrange: Mock the input and the CreateMovieAsync method
            var movieDto = new MovieDto
            {
                Name = "Test Movie",
                Language = "English",
                Format = "2D",
                Genre = "Action",
                RunTime = "120",
                Rating = 8.5,
                TicketPrice = "15.99",
                Status = "Active",
                ImageFile = null // Assume no file is uploaded for simplicity
            };

            var movie = new Movie { Name = movieDto.Name };
            _imageServiceMock.Setup(service => service.SaveImageAsync(It.IsAny<IFormFile>())).ReturnsAsync("base64image");
            _movieServiceMock.Setup(service => service.CreateMovieAsync(It.IsAny<Movie>())).ReturnsAsync(movie);

            // Act: Call the CreateMovie method
            var result = await _controller.CreateMovie(movieDto);

            // Assert: Verify that the result is Ok (HTTP 200) with the created movie
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult, "Expected OkObjectResult.");
            Assert.AreEqual(200, okResult.StatusCode, "Expected status code 200.");
            Assert.AreEqual(movie, okResult.Value, "The created movie does not match the expected result.");
        }

        [Test]
        public async Task DeleteMovie_ShouldReturnNoContent_WhenMovieIsDeleted()
        {
            // Arrange: Mock the GetMovieByIdAsync method to return a movie, and mock the DeleteMovieAsync method
            var movieId = "123";
            var movie = new Movie { Id = movieId, Name = "Test Movie" };
            _movieServiceMock.Setup(service => service.GetMovieByIdAsync(movieId)).ReturnsAsync(movie);
            _movieServiceMock.Setup(service => service.DeleteMovieAsync(movieId)).Returns(Task.CompletedTask);

            // Act: Call the DeleteMovie method
            var result = await _controller.DeleteMovie(movieId);

            // Assert: Verify that the result is NoContent (HTTP 204)
            var noContentResult = result as NoContentResult;
            Assert.IsNotNull(noContentResult, "Expected NoContentResult.");
            Assert.AreEqual(204, noContentResult.StatusCode, "Expected status code 204.");
        }

        [Test]
        public async Task UpdateMovieStatus_ShouldReturnOk_WhenStatusIsUpdated()
        {
            // Arrange: Mock the UpdateMovieStatusAsync method
            var movieId = "123";
            var status = "Inactive";
            _movieServiceMock.Setup(service => service.UpdateMovieStatusAsync(movieId, status)).Returns(Task.CompletedTask);

            // Act: Call the UpdateMovieStatus method
            var result = await _controller.UpdateMovieStatus(movieId, status);

            // Assert: Verify that the result is Ok (HTTP 200) with a success message
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult, "Expected OkObjectResult.");
            Assert.AreEqual(200, okResult.StatusCode, "Expected status code 200.");
            Assert.AreEqual("Movie status updated successfully.", ((dynamic)okResult.Value).message, "The success message does not match.");
        }

        [Test]
        public async Task AddMovieToTheater_ShouldReturnBadRequest_WhenIdsAreMissing()
        {
            // Arrange: Mock the AddMovieToTheaterAsync method
            var theaterId = "";
            var movieId = "";

            // Act: Call the AddMovieToTheater method with empty IDs
            var result = await _controller.AddMovieToTheater(theaterId, movieId);

            // Assert: Verify that the result is BadRequest (HTTP 400)
            var badRequestResult = result as BadRequestObjectResult;
            Assert.IsNotNull(badRequestResult, "Expected BadRequestObjectResult.");
            Assert.AreEqual(400, badRequestResult.StatusCode, "Expected status code 400.");
            Assert.AreEqual("Theater ID and Movie ID are required.", badRequestResult.Value, "The error message does not match.");
        }

        [Test]
        public async Task AddMovieToTheater_ShouldReturnOk_WhenMovieIsAddedToTheater()
        {
            // Arrange: Mock the AddMovieToTheaterAsync method
            var theaterId = "1";
            var movieId = "123";
            var updatedTheater = new Theater { Id = theaterId, MovieIds = new List<string> { movieId } };
            _theaterServiceMock.Setup(service => service.AddMovieToTheaterAsync(theaterId, movieId)).ReturnsAsync(updatedTheater);

            // Act: Call the AddMovieToTheater method
            var result = await _controller.AddMovieToTheater(theaterId, movieId);

            // Assert: Verify that the result is Ok (HTTP 200)
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult, "Expected OkObjectResult.");
            Assert.AreEqual(200, okResult.StatusCode, "Expected status code 200.");
            Assert.AreEqual(updatedTheater, okResult.Value, "The updated theater does not match the expected result.");
        }
    }
}
