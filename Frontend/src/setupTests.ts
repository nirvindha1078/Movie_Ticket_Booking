import axios, { AxiosInstance } from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.create.mockReturnValue({
  ...mockedAxios,
  interceptors: {
    request: { 
      use: jest.fn(),
      eject: jest.fn(),
    },
    response: { 
      use: jest.fn(),
      eject: jest.fn(),
    },
  },
} as unknown as AxiosInstance);