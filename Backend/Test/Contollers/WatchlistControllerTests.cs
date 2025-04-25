using Moq;
using NUnit.Framework;
using Movie_Ticket.Controllers;
using Movie_Ticket.Services.Watchlists;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Movie_Ticket.Tests.Controllers
{
    [TestFixture]
    public class WatchlistControllerTests
    {
        private Mock<IWatchlistService> _mockWatchlistService;
        private WatchlistController _watchlistController;

        [SetUp]
        public void SetUp()
        {
            _mockWatchlistService = new Mock<IWatchlistService>();
            _watchlistController = new WatchlistController(_mockWatchlistService.Object);
        }

        #region AddToWatchlist Tests

        [Test]
        public async Task AddToWatchlist_ShouldReturnOk_WhenMovieIsAddedSuccessfully()
        {
            // Arrange
            var movieId = "5f77e0e9b8b86d0f3f123456";
            var userId = "5f77e0e9b8b86d0f3f123456";
            _mockWatchlistService.Setup(service => service.AddMovieToWatchlist(movieId, userId))
                                 .ReturnsAsync(true); // Mocking the service method to return true when movie is added

            // Act
            var result = await _watchlistController.AddToWatchlist(movieId, userId);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode); // 200 OK
            Assert.AreEqual("Movie added to watchlist.", okResult.Value); // Verify the response message
        }

        [Test]
        public async Task AddToWatchlist_ShouldReturnBadRequest_WhenMovieAdditionFails()
        {
            // Arrange
            var movieId = "5f77e0e9b8b86d0f3f123456";
            var userId = "5f77e0e9b8b86d0f3f123456";
            _mockWatchlistService.Setup(service => service.AddMovieToWatchlist(movieId, userId))
                                 .ReturnsAsync(false); // Mocking the service method to return false when movie cannot be added

            // Act
            var result = await _watchlistController.AddToWatchlist(movieId, userId);

            // Assert
            var badRequestResult = result as BadRequestObjectResult;
            Assert.NotNull(badRequestResult);
            Assert.AreEqual(400, badRequestResult.StatusCode); // 400 BadRequest
            Assert.AreEqual("Failed to add movie to watchlist.", badRequestResult.Value); // Verify the response message
        }

        #endregion

        #region RemoveFromWatchlist Tests

        [Test]
        public async Task RemoveFromWatchlist_ShouldReturnOk_WhenMovieIsRemovedSuccessfully()
        {
            // Arrange
            var movieId = "5f77e0e9b8b86d0f3f123456";
            var userId = "5f77e0e9b8b86d0f3f123456";
            _mockWatchlistService.Setup(service => service.RemoveMovieFromWatchlist(movieId, userId))
                                 .ReturnsAsync(true); // Mocking the service method to return true when movie is removed

            // Act
            var result = await _watchlistController.RemoveFromWatchlist(movieId, userId);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode); // 200 OK
            Assert.AreEqual("Movie removed from watchlist.", okResult.Value); // Verify the response message
        }

        [Test]
        public async Task RemoveFromWatchlist_ShouldReturnBadRequest_WhenMovieRemovalFails()
        {
            // Arrange
            var movieId = "5f77e0e9b8b86d0f3f123456";
            var userId = "5f77e0e9b8b86d0f3f123456";
            _mockWatchlistService.Setup(service => service.RemoveMovieFromWatchlist(movieId, userId))
                                 .ReturnsAsync(false); // Mocking the service method to return false when movie cannot be removed

            // Act
            var result = await _watchlistController.RemoveFromWatchlist(movieId, userId);

            // Assert
            var badRequestResult = result as BadRequestObjectResult;
            Assert.NotNull(badRequestResult);
            Assert.AreEqual(400, badRequestResult.StatusCode); // 400 BadRequest
            Assert.AreEqual("Failed to remove movie from watchlist.", badRequestResult.Value); // Verify the response message
        }

        #endregion

        #region GetWatchlist Tests

        [Test]
        public async Task GetWatchlist_ShouldReturnOk_WhenMoviesFound()
        {
            // Arrange
            var userId = "5f77e0e9b8b86d0f3f123456";
            var movieIds = new List<string>
            {
                "123", "456"
            };

            // Mock the service to return the list of movie IDs (List<string> type)
            _mockWatchlistService.Setup(service => service.GetWatchlistByUserId(userId))
                                 .ReturnsAsync(movieIds); // Mocking the async return with a List<string> (movie IDs)

            // Act
            var result = await _watchlistController.GetWatchlist(userId);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode); // 200 OK
            Assert.AreEqual(movieIds, okResult.Value); // Ensure the returned value is the correct list of movie IDs
        }

        [Test]
        public async Task GetWatchlist_ShouldReturnOk_WhenNoMoviesFound()
        {
            // Arrange
            var userId = "5f77e0e9b8b86d0f3f123456";
            _mockWatchlistService.Setup(service => service.GetWatchlistByUserId(userId))
                                 .ReturnsAsync(new List<string>()); // No movies found

            // Act
            var result = await _watchlistController.GetWatchlist(userId);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode); // 200 OK
            Assert.AreEqual(new List<string>(), okResult.Value); // Should return empty list
        }

        #endregion
    }
}
