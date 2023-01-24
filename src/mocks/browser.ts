import { setupWorker } from 'msw';
import { handlers } from './wordle/handlers';

export const worker = setupWorker(...handlers);
