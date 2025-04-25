import { getAllMovies, Movie } from './movieService';

global.fetch = jest.fn();

describe('MovieService', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    it('should fetch all movies with filters', async () => {
        const mockMovies: Movie[] = [
            {
                id: '1',
                name: 'Movie 1',
                language: 'English',
                format: '2D',
                genre: 'Action',
                posterUrl: 'http://example.com/poster1.jpg',
                runTime: '120 min',
                rating: 4.5,
                status: 'Released'
            },
            {
                id: '2',
                name: 'Movie 2',
                language: 'English',
                format: '3D',
                genre: 'Comedy',
                posterUrl: 'http://example.com/poster2.jpg',
                runTime: '90 min',
                rating: 4.0,
                status: 'Released'
            }
        ];

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockMovies,
        });

        const filters = { language: 'English', format: '2D', genre: 'Action' };
        const result = await getAllMovies(filters);

        expect(fetch).toHaveBeenCalledWith(
            'https://localhost:7128/api/movie/filter?language=English&format=2D&genre=Action',
            { method: 'GET' }
        );
        expect(result).toEqual(mockMovies);
    });

    it('should handle fetch error', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        const filters = { language: 'English', format: '2D', genre: 'Action' };

        await expect(getAllMovies(filters)).rejects.toThrow('Error fetching movies');
    });

    it('should return message if data contains message', async () => {
        const mockResponse = { message: 'No movies found' };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const filters = { language: 'English', format: '2D', genre: 'Action' };
        const result = await getAllMovies(filters);

        expect(result).toEqual({ message: 'No movies found' });
    });
});