public class ImageService : IImageService
{
        public async Task<string> SaveImageAsync(IFormFile imageFile)
        {
            using (var memoryStream = new MemoryStream())
            {
                await imageFile.CopyToAsync(memoryStream);

                var base64Image = Convert.ToBase64String(memoryStream.ToArray());

                var mimeType = imageFile.ContentType; 

                return $"data:{mimeType};base64,{base64Image}";
            }
        }
}
