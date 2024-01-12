import { writable, type Writable } from 'svelte/store';

export type TGuessesModel = {
	guesses: string[];
	isWinner: boolean;
	secretWord: string | null;
};

export const wordleGameStore: Writable<TGuessesModel> = writable({
	guesses: [''],
	isWinner: false,
	secretWord: '',
});

export const secretWordStore: Writable<string[]> = writable();
