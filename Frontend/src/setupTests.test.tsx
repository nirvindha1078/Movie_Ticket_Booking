import axios from 'axios';
import { AxiosInstance } from 'axios';

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

describe('Axios Mock', () => {
    it('should create an axios instance with interceptors', () => {
        const instance = axios.create();
        expect(instance.interceptors.request.use).toBeDefined();
        expect(instance.interceptors.request.eject).toBeDefined();
        expect(instance.interceptors.response.use).toBeDefined();
        expect(instance.interceptors.response.eject).toBeDefined();
    });

    it('should call request interceptor', () => {
        const requestInterceptor = jest.fn();
        mockedAxios.create().interceptors.request.use(requestInterceptor);
        expect(mockedAxios.create().interceptors.request.use).toHaveBeenCalledWith(requestInterceptor);
    });

    it('should call response interceptor', () => {
        const responseInterceptor = jest.fn();
        mockedAxios.create().interceptors.response.use(responseInterceptor);
        expect(mockedAxios.create().interceptors.response.use).toHaveBeenCalledWith(responseInterceptor);
    });
});