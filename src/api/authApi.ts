import { AuthResponse, LoginCredentials } from '../features/auth/types';
import { delay } from '../utils/time';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(1500);

    if (credentials?.email === 'admin@test.com' && credentials?.password === '123456') {
      return {
        user: {
          id: 1,
          email: 'admin@test.com',
          name: 'John Doe',
        },
        token: 'v3ry-s3cur3-f4k3-t0k3n',
      };
    }

    throw {
      message: 'Email o contraseña incorrectos',
      status: 401,
      code: 'AUTH_INVALID_CREDENTIALS',
    };
  },
};
