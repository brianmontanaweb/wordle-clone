import { writable, type Writable } from 'svelte/store';

export const secretWordStore: Writable<string> = writable('');
export const guessesStore: Writable<string[]> = writable(new Array(6).fill(null));
export const currentGuessStore: Writable<string> = writable('');
export const wonGameStore: Writable<boolean> = writable(false);
