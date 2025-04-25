using Moq;
using Movie_Ticket.Controllers;
using Movie_Ticket.Services.Bookmarks;
using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Movie_Ticket.Tests.Controllers
{
    [TestFixture]
    public class BookmarkControllerTests
    {
        private Mock<IBookmarkService> _mockBookmarkService;
        private BookmarkController _bookmarkController;

        [SetUp]
        public void SetUp()
        {
            _mockBookmarkService = new Mock<IBookmarkService>();
            _bookmarkController = new BookmarkController(_mockBookmarkService.Object);
        }

        [Test]
        public async Task AddToBookmark_ShouldReturnOk_WhenSuccessfullyAdded()
        {
            // Arrange
            var movieId = "movie123";
            var userId = "user123";
            _mockBookmarkService.Setup(service => service.AddMovieToBookmark(movieId, userId)).ReturnsAsync(true);

            // Act
            var result = await _bookmarkController.AddToBookmark(movieId, userId) as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.AreEqual(200, result.StatusCode); // 200 OK
            Assert.AreEqual("Movie added to bookmark.", result.Value);
        }


        [Test]
        public async Task RemoveFromBookmark_ShouldReturnOk_WhenSuccessfullyRemoved()
        {
            // Arrange
            var movieId = "movie123";
            var userId = "user123";
            _mockBookmarkService.Setup(service => service.RemoveMovieFromBookmark(movieId, userId)).ReturnsAsync(true);

            // Act
            var result = await _bookmarkController.RemoveFromBookmark(movieId, userId) as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.AreEqual(200, result.StatusCode); // 200 OK
            Assert.AreEqual("Movie removed from bookmark.", result.Value);
        }

        [Test]
        public async Task RemoveFromBookmark_ShouldReturnBadRequest_WhenFailedToRemove()
        {
            // Arrange
            var movieId = "movie123";
            var userId = "user123";
            _mockBookmarkService.Setup(service => service.RemoveMovieFromBookmark(movieId, userId)).ReturnsAsync(false);

            // Act
            var result = await _bookmarkController.RemoveFromBookmark(movieId, userId) as BadRequestObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.AreEqual(400, result.StatusCode); // 400 Bad Request
            Assert.AreEqual("Failed to remove movie from bookmark.", result.Value);
        }

        [Test]
        public async Task GetBookmark_ShouldReturnOk_WhenBookmarksFound()
        {
            // Arrange
            var userId = "user123";
            var movieIds = new List<string> { "movie123", "movie456" };
            _mockBookmarkService.Setup(service => service.GetBookmarkByUserId(userId)).ReturnsAsync(movieIds);

            // Act
            var result = await _bookmarkController.GetBookmark(userId) as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.AreEqual(200, result.StatusCode); // 200 OK
            Assert.AreEqual(movieIds, result.Value);
        }

        [Test]
        public async Task GetBookmark_ShouldReturnOk_WhenNoBookmarksFound()
        {
            // Arrange
            var userId = "user123";
            var movieIds = new List<string>();
            _mockBookmarkService.Setup(service => service.GetBookmarkByUserId(userId)).ReturnsAsync(movieIds);

            // Act
            var result = await _bookmarkController.GetBookmark(userId) as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.AreEqual(200, result.StatusCode); // 200 OK
            Assert.AreEqual(movieIds, result.Value);
        }
    }
}
