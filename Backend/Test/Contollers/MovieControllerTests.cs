using Moq;
using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using Movie_Ticket.Controllers;
using Movie_Ticket.Models;
using Movie_Ticket.Services.Movies;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Movie_Ticket.Tests.Controllers
{
    public class MovieControllerTests
    {
        private Mock<IMovieService> _movieServiceMock;
        private MovieController _controller;

        [SetUp]
        public void Setup()
        {
            _movieServiceMock = new Mock<IMovieService>();
            _controller = new MovieController(_movieServiceMock.Object);
        }

        [Test]
        public async Task GetMoviesByFilters_ShouldReturnOk_WhenMoviesFound()
        {
            // Arrange: Mock the service method GetMoviesByFilterAsync to return a list of movies
            var movies = new List<Movie>
                {
                    new Movie { Id = "1", Name = "Movie 1", Genre = "Action" },
                    new Movie { Id = "2", Name = "Movie 2", Genre = "Action" }
                };

            _movieServiceMock.Setup(service => service.GetMoviesByFilterAsync("English", "2D", "Action"))
                             .ReturnsAsync(movies);

            // Act: Call the GetMoviesByFilters method
            var result = await _controller.GetMoviesByFilters("English", "2D", "Action");

            // Assert: Verify that the result is Ok (HTTP 200) with the movies list
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult, "Expected OkObjectResult.");
            Assert.That(okResult.StatusCode, Is.EqualTo(200), "Expected status code 200.");
            Assert.That(okResult.Value, Is.EqualTo(movies), "The movie list does not match the expected result.");
        }


        [Test]
        public async Task GetMoviesByIds_ShouldReturnOk_WhenMoviesFoundByIds()
        {
            // Arrange: Mock the service method GetMovieByIdsAsync to return a list of movies
            var movieIds = new List<string> { "1", "2" };
            var movies = new List<Movie>
                {
                    new Movie { Id = "1", Name = "Movie 1" },
                    new Movie { Id = "2", Name = "Movie 2" }
                };

            _movieServiceMock.Setup(service => service.GetMovieByIdsAsync(movieIds))
                             .ReturnsAsync(movies);

            // Act: Call the GetMoviesByIds method
            var result = await _controller.GetMoviesByIds(movieIds);

            // Assert: Verify that the result is Ok (HTTP 200) with the movies list
            var okResult = result.Result as OkObjectResult;  // Cast the result to OkObjectResult
            Assert.IsNotNull(okResult, "Expected OkObjectResult.");
            Assert.That(okResult.StatusCode, Is.EqualTo(200), "Expected status code 200.");
            Assert.That(okResult.Value, Is.EqualTo(movies), "The movie list does not match the expected result.");
        }

        [Test]
        public async Task GetMoviesByIds_ShouldReturnNotFound_WhenMoviesNotFound()
        {
            // Arrange: Mock the service method GetMovieByIdsAsync to return null (no movies found)
            var movieIds = new List<string> { "999", "1000" };
            _movieServiceMock.Setup(service => service.GetMovieByIdsAsync(movieIds))
                             .ReturnsAsync(new List<Movie>());

            // Act: Call the GetMoviesByIds method
            var result = await _controller.GetMoviesByIds(movieIds);

            // Assert: Verify that the result is NotFound (HTTP 404) with an appropriate message
            var notFoundResult = result.Result as NotFoundObjectResult;
            Assert.IsNotNull(notFoundResult, "Expected NotFoundObjectResult.");
            Assert.That(notFoundResult.StatusCode, Is.EqualTo(404), "Expected status code 404.");
            Assert.That(notFoundResult.Value, Is.EqualTo("Movies not found."), "The error message does not match.");
        }

        [Test]
        public async Task GetMoviesByIds_ShouldReturnOk_WhenNoIdsProvided()
        {
            // Arrange: Mock the service method GetAllMoviesAsync to return a list of movies
            var allMovies = new List<Movie>
                {
                    new Movie { Id = "1", Name = "Movie 1" },
                    new Movie { Id = "2", Name = "Movie 2" }
                };

            _movieServiceMock.Setup(service => service.GetAllMoviesAsync())
                             .ReturnsAsync(allMovies);

            // Act: Call the GetMoviesByIds method with no movieIds (null or empty list)
            var result = await _controller.GetMoviesByIds(null);

            // Assert: Verify that the result is Ok (HTTP 200) with the movies list
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult, "Expected OkObjectResult.");
            Assert.That(okResult.StatusCode, Is.EqualTo(200), "Expected status code 200.");
            Assert.That(okResult.Value, Is.EqualTo(allMovies), "The movie list does not match the expected result.");
        }
    }
}