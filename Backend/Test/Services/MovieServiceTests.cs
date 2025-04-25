using Moq;
using NUnit.Framework;
using Movie_Ticket.Models;
using Movie_Ticket.Repository.Movies;
using Movie_Ticket.Services.Movies;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Movie_Ticket.nUnitTests.Services
{
    [TestFixture]
    public class MovieServiceTests
    {
        private Mock<IMovieRepository> _mockMovieRepository;
        private MovieService _movieService;

        [SetUp]
        public void SetUp()
        {
            _mockMovieRepository = new Mock<IMovieRepository>();
            _movieService = new MovieService(_mockMovieRepository.Object);
        }

        [Test]
        public async Task CreateMovieAsync_ShouldCallCreateMovieMethod()
        {
            // Arrange
            var movie = new Movie { Id = "1", Name = "Test Movie", Genre = "Action" };

            // Act
            await _movieService.CreateMovieAsync(movie);

            // Assert
            _mockMovieRepository.Verify(r => r.CreateAsync(It.Is<Movie>(m => m == movie)), Times.Once);
        }

        [Test]
        public async Task GetAllMoviesAsync_ShouldReturnListOfMovies()
        {
            // Arrange
            var movies = new List<Movie>
            {
                new Movie { Id = "1", Name = "Movie 1", Genre = "Action" },
                new Movie { Id = "2", Name = "Movie 2", Genre = "Drama" }
            };
            _mockMovieRepository.Setup(r => r.GetAllAsync()).ReturnsAsync(movies);

            // Act
            var result = await _movieService.GetAllMoviesAsync();

            // Assert
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual("Movie 1", result[0].Name);
            Assert.AreEqual("Movie 2", result[1].Name);
        }

        [Test]
        public async Task GetMovieByIdAsync_ShouldReturnMovie_WhenMovieExists()
        {
            // Arrange
            var movieId = "1";
            var movie = new Movie { Id = "1", Name = "Test Movie", Genre = "Action" };
            _mockMovieRepository.Setup(r => r.GetByIdAsync(movieId)).ReturnsAsync(movie);

            // Act
            var result = await _movieService.GetMovieByIdAsync(movieId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Test Movie", result.Name);
        }

        [Test]
        public async Task UpdateMovieAsync_ShouldCallUpdateMovieMethod()
        {
            // Arrange
            var movieId = "1";
            var movie = new Movie { Id = "1", Name = "Updated Movie", Genre = "Comedy" };

            // Act
            await _movieService.UpdateMovieAsync(movieId, movie);

            // Assert
            _mockMovieRepository.Verify(r => r.UpdateAsync(movieId, It.Is<Movie>(m => m == movie)), Times.Once);
        }

        [Test]
        public async Task DeleteMovieAsync_ShouldCallDeleteMovieMethod()
        {
            // Arrange
            var movieId = "1";

            // Act
            await _movieService.DeleteMovieAsync(movieId);

            // Assert
            _mockMovieRepository.Verify(r => r.DeleteAsync(movieId), Times.Once);
        }

        [Test]
        public async Task GetMoviesByFilterAsync_ShouldReturnFilteredMovies()
        {
            // Arrange
            var filter = "Action";
            var movies = new List<Movie>
            {
                new Movie { Id = "1", Name = "Movie 1", Genre = "Action" },
                new Movie { Id = "2", Name = "Movie 2", Genre = "Action" }
            };
            _mockMovieRepository.Setup(r => r.GetMoviesByFiltersAsync(It.IsAny<MongoDB.Driver.FilterDefinition<Movie>>())).ReturnsAsync(movies);

            // Act
            var result = await _movieService.GetMoviesByFilterAsync("Action", null, null);

            // Assert
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual("Movie 1", result[0].Name);
            Assert.AreEqual("Movie 2", result[1].Name);
        }

        [Test]
        public async Task UpdateMovieStatusAsync_ShouldThrowException_WhenInvalidStatus()
        {
            // Arrange
            var movieId = "1";
            var invalidStatus = "NotAvailable";

            // Act & Assert
            var ex = Assert.ThrowsAsync<Exception>(async () => await _movieService.UpdateMovieStatusAsync(movieId, invalidStatus));
            Assert.AreEqual("Invalid status value. Status must be 'running' or 'upcoming'.", ex.Message);
        }

        [Test]
        public async Task UpdateMovieStatusAsync_ShouldCallUpdateStatus_WhenValidStatus()
        {
            // Arrange
            var movieId = "1";
            var validStatus = "Running";

            // Act
            await _movieService.UpdateMovieStatusAsync(movieId, validStatus);

            // Assert
            _mockMovieRepository.Verify(r => r.UpdateMovieStatusAsync(movieId, validStatus), Times.Once);
        }
    }
}
