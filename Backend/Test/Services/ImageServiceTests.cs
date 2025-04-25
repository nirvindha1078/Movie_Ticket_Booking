using NUnit.Framework;
using Moq;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Movie_Ticket.nUnitTests.Services
{
    public class ImageServiceTests
    {
        private Mock<IFormFile> _mockImageFile;
        private ImageService _imageService;

        [SetUp]
        public void Setup()
        {
            _imageService = new ImageService();

            _mockImageFile = new Mock<IFormFile>();

            // Providing larger fake image content
            var fakeImageContent = new byte[1024]; // 1KB of fake content
            var memoryStream = new MemoryStream(fakeImageContent);
            _mockImageFile.Setup(f => f.OpenReadStream()).Returns(memoryStream);
            _mockImageFile.Setup(f => f.Length).Returns(fakeImageContent.Length);
            _mockImageFile.Setup(f => f.ContentType).Returns("image/png");
        }

        [Test]
        public async Task SaveImageAsync_ShouldReturnBase64StringWithMimeType()
        {
            var result = await _imageService.SaveImageAsync(_mockImageFile.Object);

            var expectedPrefix = "data:image/png;base64,";
            Console.WriteLine($"Result Length: {result.Length}");
            Console.WriteLine($"Result: {result}");

            Assert.That(result.StartsWith(expectedPrefix), Is.True);
            Assert.That(result.Length, Is.GreaterThan(expectedPrefix.Length));
        }
    }
}
