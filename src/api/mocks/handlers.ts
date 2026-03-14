import { AxiosRequestConfig } from 'axios';
import { delay } from '../../utils/time';
import { mockInstance } from './setup';
import { AuthResponse, LoginCredentials } from '../../features/auth/types';

export const setupHnalders = () => {
  mockInstance
    .onPost('/login')
    .reply(
      async (config: AxiosRequestConfig): Promise<[number, AuthResponse | { message: string }]> => {
        await delay(1500);
        const { email, password }: LoginCredentials = JSON.parse(config.data);

        if (email === 'admin@test.com' && password === '123456') {
          return [
            200,
            {
              token: 'v3ry-s3cur3-f4k3-t0k3n',
              user: {
                id: 1,
                name: 'John Doe',
                email: 'admin@test.com',
              },
            },
          ];
        }

        return [401, { message: 'Credenciales inválidas' }];
      },
    );
};
