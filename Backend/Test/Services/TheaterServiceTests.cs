using Moq;
using NUnit.Framework;
using Movie_Ticket.Services;
using Movie_Ticket.Repository;
using Movie_Ticket.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Movie_Ticket.nUnitTests.Services
{
    [TestFixture]
    public class TheaterServiceTests
    {
        private Mock<ITheaterRepository> _mockTheaterRepository;
        private TheaterService _theaterService;

        [SetUp]
        public void SetUp()
        {
            _mockTheaterRepository = new Mock<ITheaterRepository>();
            _theaterService = new TheaterService(_mockTheaterRepository.Object);
        }

        #region GetAllTheatersAsync Tests

        [Test]
        public async Task GetAllTheatersAsync_ShouldReturnListOfTheaters_WhenTheatersExist()
        {
            // Arrange
            var theaters = new List<Theater>
            {
                new Theater { Id = "1", Name = "Theater 1" },
                new Theater { Id = "2", Name = "Theater 2" }
            };
            _mockTheaterRepository.Setup(repo => repo.GetAllTheatersAsync()).ReturnsAsync(theaters);

            // Act
            var result = await _theaterService.GetAllTheatersAsync();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual("Theater 1", result[0].Name);
        }

        [Test]
        public async Task GetAllTheatersAsync_ShouldReturnEmptyList_WhenNoTheatersExist()
        {
            // Arrange
            var theaters = new List<Theater>();
            _mockTheaterRepository.Setup(repo => repo.GetAllTheatersAsync()).ReturnsAsync(theaters);

            // Act
            var result = await _theaterService.GetAllTheatersAsync();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(0, result.Count);
        }

        #endregion

        #region GetTheaterByIdAsync Tests

        [Test]
        public async Task GetTheaterByIdAsync_ShouldReturnTheater_WhenTheaterExists()
        {
            // Arrange
            var theater = new Theater { Id = "1", Name = "Theater 1" };
            _mockTheaterRepository.Setup(repo => repo.GetTheaterByIdAsync("1")).ReturnsAsync(theater);

            // Act
            var result = await _theaterService.GetTheaterByIdAsync("1");

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Theater 1", result.Name);
        }

        [Test]
        public async Task GetTheaterByIdAsync_ShouldReturnNull_WhenTheaterDoesNotExist()
        {
            // Arrange
            _mockTheaterRepository.Setup(repo => repo.GetTheaterByIdAsync("999")).ReturnsAsync((Theater)null);

            // Act
            var result = await _theaterService.GetTheaterByIdAsync("999");

            // Assert
            Assert.IsNull(result);
        }

        #endregion

        #region CreateTheaterAsync Tests

        [Test]
        public async Task CreateTheaterAsync_ShouldReturnTheater_WhenTheaterIsCreated()
        {
            // Arrange
            var newTheater = new Theater { Id = "3", Name = "Theater 3" };
            _mockTheaterRepository.Setup(repo => repo.CreateTheaterAsync(It.IsAny<Theater>())).ReturnsAsync(newTheater);

            // Act
            var result = await _theaterService.CreateTheaterAsync(newTheater);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Theater 3", result.Name);
        }

        [Test]
        public async Task CreateTheaterAsync_ShouldReturnNull_WhenTheaterCreationFails()
        {
            // Arrange
            _mockTheaterRepository.Setup(repo => repo.CreateTheaterAsync(It.IsAny<Theater>())).ReturnsAsync((Theater)null);

            // Act
            var result = await _theaterService.CreateTheaterAsync(new Theater { Id = "3", Name = "Theater 3" });

            // Assert
            Assert.IsNull(result);
        }

        #endregion

        #region UpdateTheaterAsync Tests

        [Test]
        public async Task UpdateTheaterAsync_ShouldReturnUpdatedTheater_WhenUpdateIsSuccessful()
        {
            // Arrange
            var updatedTheater = new Theater { Id = "1", Name = "Updated Theater 1" };
            _mockTheaterRepository.Setup(repo => repo.UpdateTheaterAsync("1", It.IsAny<Theater>())).ReturnsAsync(updatedTheater);

            // Act
            var result = await _theaterService.UpdateTheaterAsync("1", updatedTheater);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Updated Theater 1", result.Name);
        }

        [Test]
        public async Task UpdateTheaterAsync_ShouldReturnNull_WhenUpdateFails()
        {
            // Arrange
            _mockTheaterRepository.Setup(repo => repo.UpdateTheaterAsync("999", It.IsAny<Theater>())).ReturnsAsync((Theater)null);

            // Act
            var result = await _theaterService.UpdateTheaterAsync("999", new Theater { Id = "999", Name = "Non-existing Theater" });

            // Assert
            Assert.IsNull(result);
        }

        #endregion

        #region DeleteTheaterAsync Tests

        [Test]
        public async Task DeleteTheaterAsync_ShouldReturnTrue_WhenTheaterIsDeleted()
        {
            // Arrange
            _mockTheaterRepository.Setup(repo => repo.DeleteTheaterAsync("1")).ReturnsAsync(true);

            // Act
            var result = await _theaterService.DeleteTheaterAsync("1");

            // Assert
            Assert.IsTrue(result);
        }

        [Test]
        public async Task DeleteTheaterAsync_ShouldReturnFalse_WhenTheaterDeletionFails()
        {
            // Arrange
            _mockTheaterRepository.Setup(repo => repo.DeleteTheaterAsync("999")).ReturnsAsync(false);

            // Act
            var result = await _theaterService.DeleteTheaterAsync("999");

            // Assert
            Assert.IsFalse(result);
        }

        #endregion

        #region UpdateAvailableSeatsAsync Tests

        [Test]
        public async Task UpdateAvailableSeatsAsync_ShouldReturnTrue_WhenSeatsAreUpdatedSuccessfully()
        {
            // Arrange
            var theater = new Theater
            {
                Id = "1",
                TimeSlots = new List<TimeSlot>
                {
                    new TimeSlot { Time = "10:00 AM", AvailableSeats = 10 }
                }
            };
            _mockTheaterRepository.Setup(repo => repo.GetTheaterByIdAsync("1")).ReturnsAsync(theater);
            _mockTheaterRepository.Setup(repo => repo.UpdateAsync(It.IsAny<Theater>())).Returns(Task.CompletedTask);

            // Act
            var result = await _theaterService.UpdateAvailableSeatsAsync("1", "10:00 AM", 5);

            // Assert
            Assert.IsTrue(result);
        }

        [Test]
        public async Task UpdateAvailableSeatsAsync_ShouldReturnFalse_WhenSeatsAreNotAvailable()
        {
            // Arrange
            var theater = new Theater
            {
                Id = "1",
                TimeSlots = new List<TimeSlot>
                {
                    new TimeSlot { Time = "10:00 AM", AvailableSeats = 2 }
                }
            };
            _mockTheaterRepository.Setup(repo => repo.GetTheaterByIdAsync("1")).ReturnsAsync(theater);

            // Act
            var result = await _theaterService.UpdateAvailableSeatsAsync("1", "10:00 AM", 5);

            // Assert
            Assert.IsFalse(result);
        }

        #endregion

        #region GetTheatersByIdsAsync Tests

        [Test]
        public async Task GetTheatersByIdsAsync_ShouldReturnTheaterList_WhenTheaterIdsExist()
        {
            // Arrange
            var theaters = new List<Theater>
            {
                new Theater { Id = "1", Name = "Theater 1" },
                new Theater { Id = "2", Name = "Theater 2" }
            };
            _mockTheaterRepository.Setup(repo => repo.GetTheatersByIdsAsync(It.IsAny<List<string>>())).ReturnsAsync(theaters);

            // Act
            var result = await _theaterService.GetTheatersByIdsAsync(new List<string> { "1", "2" });

            // Assert
            Assert.AreEqual(2, result.Count);
        }

        [Test]
        public async Task GetTheatersByIdsAsync_ShouldReturnEmptyList_WhenNoTheaterIdsExist()
        {
            // Arrange
            _mockTheaterRepository.Setup(repo => repo.GetTheatersByIdsAsync(It.IsAny<List<string>>())).ReturnsAsync(new List<Theater>());

            // Act
            var result = await _theaterService.GetTheatersByIdsAsync(new List<string> { "999" });

            // Assert
            Assert.AreEqual(0, result.Count);
        }

        #endregion

        #region GetTheaterIdsByMovieIdAsync Tests

        [Test]
        public async Task GetTheaterIdsByMovieIdAsync_ShouldReturnTheaterIds_WhenMovieIdExists()
        {
            // Arrange
            var theaterIds = new List<string> { "1", "2" };
            _mockTheaterRepository.Setup(repo => repo.GetTheaterIdsByMovieIdAsync("movie1")).ReturnsAsync(theaterIds);

            // Act
            var result = await _theaterService.GetTheaterIdsByMovieIdAsync("movie1");

            // Assert
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual("1", result[0]);
        }

        [Test]
        public async Task GetTheaterIdsByMovieIdAsync_ShouldReturnEmptyList_WhenMovieIdDoesNotExist()
        {
            // Arrange
            _mockTheaterRepository.Setup(repo => repo.GetTheaterIdsByMovieIdAsync("nonexistent")).ReturnsAsync(new List<string>());

            // Act
            var result = await _theaterService.GetTheaterIdsByMovieIdAsync("nonexistent");

            // Assert
            Assert.AreEqual(0, result.Count);
        }

        #endregion
    }
}
