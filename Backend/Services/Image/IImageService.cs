﻿public interface IImageService
{
    Task<string> SaveImageAsync(IFormFile imageFile);
}
