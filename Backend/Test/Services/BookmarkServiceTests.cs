using Moq;
using NUnit.Framework;
using Movie_Ticket.Services.Bookmarks;
using Movie_Ticket.Repository.Bookmarks;
using System.Collections.Generic;
using System.Threading.Tasks;
using Movie_Ticket.Models;

namespace Movie_Ticket.nUnitTests.Services.Bookmarks
{
    [TestFixture]
    public class BookmarkServiceTests
    {
        private Mock<IBookmarkRepository> _mockBookmarkRepository;
        private BookmarkService _bookmarkService;

        [SetUp]
        public void SetUp()
        {
            // Initialize the mock repository and the BookmarkService
            _mockBookmarkRepository = new Mock<IBookmarkRepository>();
            _bookmarkService = new BookmarkService(_mockBookmarkRepository.Object);
        }

        #region AddMovieToBookmark Tests

        [Test]
        public async Task AddMovieToBookmark_ShouldReturnTrue_WhenMovieIsAddedSuccessfully()
        {
            // Arrange
            _mockBookmarkRepository.Setup(repo => repo.AddMovieToBookmarkAsync("movieId1", "userId1")).ReturnsAsync(true);

            // Act
            var result = await _bookmarkService.AddMovieToBookmark("movieId1", "userId1");

            // Assert
            Assert.IsTrue(result);
        }

        [Test]
        public async Task AddMovieToBookmark_ShouldReturnFalse_WhenMovieAdditionFails()
        {
            // Arrange
            _mockBookmarkRepository.Setup(repo => repo.AddMovieToBookmarkAsync("movieId1", "userId1")).ReturnsAsync(false);

            // Act
            var result = await _bookmarkService.AddMovieToBookmark("movieId1", "userId1");

            // Assert
            Assert.IsFalse(result);
        }

        #endregion

        #region RemoveMovieFromBookmark Tests

        [Test]
        public async Task RemoveMovieFromBookmark_ShouldReturnTrue_WhenMovieIsRemovedSuccessfully()
        {
            // Arrange
            _mockBookmarkRepository.Setup(repo => repo.RemoveMovieFromBookmarkAsync("movieId1", "userId1")).ReturnsAsync(true);

            // Act
            var result = await _bookmarkService.RemoveMovieFromBookmark("movieId1", "userId1");

            // Assert
            Assert.IsTrue(result);
        }

        [Test]
        public async Task RemoveMovieFromBookmark_ShouldReturnFalse_WhenMovieRemovalFails()
        {
            // Arrange
            _mockBookmarkRepository.Setup(repo => repo.RemoveMovieFromBookmarkAsync("movieId1", "userId1")).ReturnsAsync(false);

            // Act
            var result = await _bookmarkService.RemoveMovieFromBookmark("movieId1", "userId1");

            // Assert
            Assert.IsFalse(result);
        }

        #endregion

        #region GetBookmarkByUserId Tests

        [Test]
        public async Task GetBookmarkByUserId_ShouldReturnListOfMovieIds_WhenBookmarkExists()
        {
            // Arrange
            var movieIds = new List<string> { "movieId1", "movieId2" };
            _mockBookmarkRepository.Setup(repo => repo.GetBookmarkByUserIdAsync("userId1")).ReturnsAsync(new Bookmark { MovieIds = movieIds });

            // Act
            var result = await _bookmarkService.GetBookmarkByUserId("userId1");

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual("movieId1", result[0]);
            Assert.AreEqual("movieId2", result[1]);
        }

        [Test]
        public async Task GetBookmarkByUserId_ShouldReturnEmptyList_WhenBookmarkDoesNotExist()
        {
            // Arrange
            _mockBookmarkRepository.Setup(repo => repo.GetBookmarkByUserIdAsync("userId1")).ReturnsAsync((Bookmark)null);

            // Act
            var result = await _bookmarkService.GetBookmarkByUserId("userId1");

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(0, result.Count);
        }

        #endregion
    }
}
