import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { UserProvider, useUserContext } from './UserContext';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const TestComponent: React.FC = () => {
    const { userId, watchlist, bookmark } = useUserContext();
    return (
        <div>
            <div data-testid="userId">{userId}</div>
            <div data-testid="watchlist">{watchlist.join(', ')}</div>
            <div data-testid="bookmark">{bookmark.join(', ')}</div>
        </div>
    );
};

describe('UserContext', () => {
    beforeEach(() => {
        localStorage.setItem('userId', 'testUserId');
    });

    afterEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('should fetch user data and update context values', async () => {
        const watchlistData = ['movie1', 'movie2'];
        const bookmarkData = ['bookmark1', 'bookmark2'];

        mockedAxios.get.mockResolvedValueOnce({ data: watchlistData });
        mockedAxios.get.mockResolvedValueOnce({ data: bookmarkData });

        const { getByTestId } = render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        await waitFor(() => {
            expect(getByTestId('userId').textContent).toBe('testUserId');
            expect(getByTestId('watchlist').textContent).toBe('movie1, movie2');
            expect(getByTestId('bookmark').textContent).toBe('bookmark1, bookmark2');
        });
    });

    it('should handle errors when fetching user data', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

        const { getByTestId } = render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        await waitFor(() => {
            expect(getByTestId('userId').textContent).toBe('testUserId');
            expect(getByTestId('watchlist').textContent).toBe('');
            expect(getByTestId('bookmark').textContent).toBe('');
        });
    });
});