import { rest } from 'msw';
import { wordleData } from './data.js';

export const handlers = [
	rest.get('http://wordle-clone.com/api/wordle', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(wordleData));
	})
];
