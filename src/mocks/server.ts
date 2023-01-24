import { setupServer } from 'msw/node';
import { handlers } from './wordle/handlers.js';

export const server = setupServer(...handlers);
