import api from '../utils/Api/api';

class AuthService {
  static async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    return response;
  }

  static async signup(username: string, email: string, password: string) {
    const response = await api.post('/auth/register', { username, email, password });
    return response;
  }
}

export default AuthService;
