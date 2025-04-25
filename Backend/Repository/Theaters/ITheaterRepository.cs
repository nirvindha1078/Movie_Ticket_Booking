public interface ITheaterRepository
{
    Task<List<Theater>> GetAllTheatersAsync();
    Task<Theater> GetTheaterByIdAsync(string id);
    Task<Theater> CreateTheaterAsync(Theater theater);
    Task<Theater> UpdateTheaterAsync(string id, Theater theater);
    Task<bool> DeleteTheaterAsync(string id);
    Task UpdateAsync(Theater theater);

    Task<List<Theater>> GetTheatersByIdsAsync(List<string> theaterIds);

    Task<List<string>> GetTheaterIdsByMovieIdAsync(string movieId);

    Task<Theater> AppendMovieToTheaterAsync(string theaterId, string movieId);
}

