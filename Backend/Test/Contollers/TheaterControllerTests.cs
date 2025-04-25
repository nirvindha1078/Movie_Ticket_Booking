using Moq;
using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using MovieBookingSystem.Controllers;
using Movie_Ticket.Requests;

namespace Movie_Ticket.Tests.Controllers
{
    public class TheaterControllerTests
    {
        private Mock<ITheaterService> _theaterServiceMock;
        private TheaterController _controller;

        [SetUp]
        public void Setup()
        {
            _theaterServiceMock = new Mock<ITheaterService>();
            _controller = new TheaterController(_theaterServiceMock.Object);
        }

        [Test]
        public async Task GetTheater_ShouldReturnOk_WhenTheatersExist()
        {
            // Arrange
            var theaterIds = new List<string> { "1", "2" };
            var theaters = new List<Theater>
            {
                new Theater { Id = "1", Name = "Theater 1" },
                new Theater { Id = "2", Name = "Theater 2" }
            };

            _theaterServiceMock.Setup(service => service.GetTheatersByIdsAsync(theaterIds))
                               .ReturnsAsync(theaters);

            // Act
            var result = await _controller.GetTheater(theaterIds);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.AreEqual(theaters, okResult.Value);
        }

        [Test]
        public async Task GetTheater_ShouldReturnNotFound_WhenNoTheatersFound()
        {
            // Arrange
            var theaterIds = new List<string> { "999" };
            _theaterServiceMock.Setup(service => service.GetTheatersByIdsAsync(theaterIds))
                               .ReturnsAsync(new List<Theater>());

            // Act
            var result = await _controller.GetTheater(theaterIds);

            // Assert
            var notFoundResult = result as NotFoundObjectResult;
            Assert.IsNotNull(notFoundResult);
            Assert.AreEqual(404, notFoundResult.StatusCode);
            Assert.AreEqual("Theaters not found.", notFoundResult.Value);
        }

        [Test]
        public async Task CreateTheater_ShouldReturnCreatedAtAction_WhenTheaterIsCreated()
        {
            // Arrange
            var newTheater = new Theater { Id = "1", Name = "New Theater" };
            _theaterServiceMock.Setup(service => service.CreateTheaterAsync(It.IsAny<Theater>()))
                               .ReturnsAsync(newTheater);

            // Act
            var result = await _controller.CreateTheater(newTheater);

            // Assert
            var createdAtActionResult = result as CreatedAtActionResult;
            Assert.IsNotNull(createdAtActionResult);
            Assert.AreEqual(201, createdAtActionResult.StatusCode);
            Assert.AreEqual(newTheater, createdAtActionResult.Value);
        }

        [Test]
        public async Task DeleteTheater_ShouldReturnNoContent_WhenTheaterIsDeleted()
        {
            // Arrange
            _theaterServiceMock.Setup(service => service.DeleteTheaterAsync("1"))
                               .ReturnsAsync(true);

            // Act
            var result = await _controller.DeleteTheater("1");

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
        }

        [Test]
        public async Task UpdateAvailableSeats_ShouldReturnBadRequest_WhenSeatsBookedIsZero()
        {
            // Arrange
            var theaterId = "1";
            var time = "12:00";
            var request = new TimeSlotUpdateRequest { SeatsBooked = 0 };

            // Act
            var result = await _controller.UpdateAvailableSeats(theaterId, time, request);

            // Assert
            var badRequestResult = result as BadRequestObjectResult;
            Assert.IsNotNull(badRequestResult);
            Assert.AreEqual(400, badRequestResult.StatusCode);
            Assert.AreEqual("Seats booked should be greater than zero.", badRequestResult.Value);
        }
    }
}
