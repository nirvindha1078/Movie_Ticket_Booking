using Moq;
using NUnit.Framework;
using Movie_Ticket.Services.Watchlists;
using Movie_Ticket.Repository.Watchlists;
using Movie_Ticket.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Movie_Ticket.Tests.Services.Watchlists
{
    [TestFixture]
    public class WatchlistServiceTests
    {
        private Mock<IWatchlistRepository> _mockWatchlistRepository;
        private WatchlistService _watchlistService;

        [SetUp]
        public void SetUp()
        {
            _mockWatchlistRepository = new Mock<IWatchlistRepository>();
            _watchlistService = new WatchlistService(_mockWatchlistRepository.Object);
        }

        #region AddMovieToWatchlist Tests

        [Test]
        public async Task AddMovieToWatchlist_ShouldReturnTrue_WhenMovieIsAddedSuccessfully()
        {
            // Arrange
            var movieId = "123";
            var userId = "user1";
            _mockWatchlistRepository.Setup(repo => repo.AddMovieToWatchlistAsync(movieId, userId))
                                    .ReturnsAsync(true); 

            // Act
            var result = await _watchlistService.AddMovieToWatchlist(movieId, userId);

            // Assert
            Assert.IsTrue(result);
        }

        [Test]
        public async Task AddMovieToWatchlist_ShouldReturnFalse_WhenMovieAdditionFails()
        {
            // Arrange
            var movieId = "123";
            var userId = "user1";
            _mockWatchlistRepository.Setup(repo => repo.AddMovieToWatchlistAsync(movieId, userId))
                                    .ReturnsAsync(false); 

            // Act
            var result = await _watchlistService.AddMovieToWatchlist(movieId, userId);

            // Assert
            Assert.IsFalse(result);
        }

        #endregion

        #region RemoveMovieFromWatchlist Tests

        [Test]
        public async Task RemoveMovieFromWatchlist_ShouldReturnTrue_WhenMovieIsRemovedSuccessfully()
        {
            // Arrange
            var movieId = "123";
            var userId = "user1";
            _mockWatchlistRepository.Setup(repo => repo.RemoveMovieFromWatchlistAsync(movieId, userId))
                                    .ReturnsAsync(true); 

            // Act
            var result = await _watchlistService.RemoveMovieFromWatchlist(movieId, userId);

            // Assert
            Assert.IsTrue(result);
        }

        [Test]
        public async Task RemoveMovieFromWatchlist_ShouldReturnFalse_WhenMovieRemovalFails()
        {
            // Arrange
            var movieId = "123";
            var userId = "user1";
            _mockWatchlistRepository.Setup(repo => repo.RemoveMovieFromWatchlistAsync(movieId, userId))
                                    .ReturnsAsync(false); 

            // Act
            var result = await _watchlistService.RemoveMovieFromWatchlist(movieId, userId);

            // Assert
            Assert.IsFalse(result);
        }

        #endregion

        #region GetWatchlistByUserId Tests

        [Test]
        public async Task GetWatchlistByUserId_ShouldReturnMovieIds_WhenWatchlistExists()
        {
            // Arrange
            var userId = "user1";
            var watchlist = new Watchlist
            {
                MovieIds = new List<string> { "123", "456" }
            };
            _mockWatchlistRepository.Setup(repo => repo.GetWatchlistByUserIdAsync(userId))
                                    .ReturnsAsync(watchlist); 

            // Act
            var result = await _watchlistService.GetWatchlistByUserId(userId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual("123", result[0]);
            Assert.AreEqual("456", result[1]);
        }

        [Test]
        public async Task GetWatchlistByUserId_ShouldReturnEmptyList_WhenWatchlistIsNull()
        {
            // Arrange
            var userId = "user1";
            _mockWatchlistRepository.Setup(repo => repo.GetWatchlistByUserIdAsync(userId))
                                    .ReturnsAsync((Watchlist)null); 

            // Act
            var result = await _watchlistService.GetWatchlistByUserId(userId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(0, result.Count); // Empty list
        }

        #endregion
    }
}
