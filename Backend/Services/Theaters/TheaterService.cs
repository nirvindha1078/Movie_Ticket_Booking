
public class TheaterService : ITheaterService
{
    private readonly ITheaterRepository _theaterRepository;

    public TheaterService(ITheaterRepository theaterRepository)
    {
        _theaterRepository = theaterRepository;
    }

    public async Task<List<Theater>> GetAllTheatersAsync()
    {
        return await _theaterRepository.GetAllTheatersAsync();
    }

    public async Task<Theater> GetTheaterByIdAsync(string id)
    {
        return await _theaterRepository.GetTheaterByIdAsync(id);
    }

    public async Task<Theater> CreateTheaterAsync(Theater theater)
    {
        return await _theaterRepository.CreateTheaterAsync(theater);
    }

    public async Task<Theater> UpdateTheaterAsync(string id, Theater theater)
    {
        return await _theaterRepository.UpdateTheaterAsync(id, theater);
    }

    public async Task<bool> DeleteTheaterAsync(string id)
    {
        return await _theaterRepository.DeleteTheaterAsync(id);
    }

    public async Task<Theater> AddMovieToTheaterAsync(string theaterId, string movieId)
    {
        var theater = await _theaterRepository.GetTheaterByIdAsync(theaterId);

        if (theater == null)
        {
            return null; 
        }

        if (theater.MovieIds.Contains(movieId))
        {
            return theater; 
        }

        var updatedTheater = await _theaterRepository.AppendMovieToTheaterAsync(theaterId, movieId);

        return updatedTheater;
    }

    public async Task<bool> UpdateAvailableSeatsAsync(string theaterId, string time, int seatsBooked)
    {
        var theater = await _theaterRepository.GetTheaterByIdAsync(theaterId);

        if (theater != null)
        {
            var slot = theater.TimeSlots.FirstOrDefault(ts => ts.Time == time);

            if (slot != null && slot.AvailableSeats >= seatsBooked)
            {
                slot.AvailableSeats -= seatsBooked;  
                await _theaterRepository.UpdateAsync(theater);  
                return true;
            }
        }
        return false;
    }

    public async Task<List<Theater>> GetTheatersByIdsAsync(List<string> theaterIds)
    {
        return await _theaterRepository.GetTheatersByIdsAsync(theaterIds);
    }

    public async Task<List<string>> GetTheaterIdsByMovieIdAsync(string movieId)
    {
        return await _theaterRepository.GetTheaterIdsByMovieIdAsync(movieId);
    }

}

