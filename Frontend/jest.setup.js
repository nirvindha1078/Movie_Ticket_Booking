import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
//jest.mock('../assets/download.png', () => 'mocked-image.png');