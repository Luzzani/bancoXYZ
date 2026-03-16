import MockAdapter from 'axios-mock-adapter';
import { apiClient } from '../apiClient';

export const mockInstance = new MockAdapter(apiClient);
