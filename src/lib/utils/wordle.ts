import { NUMBER_OF_GUESSES, WORD_LENGTH } from '$lib/constants/wordle';
import { wordleGameStore, type TGuessesModel } from '$src/stores/wordle';

export const getSecretWord = (words: string[]): string => {
	return words[Math.floor(Math.random() * words.length)].toLowerCase();
};

export const validateSecretWord = (guess: string, secretWord: string): number[] => {
	const secretWordMap: Record<string, number> = {};
	const verifiedArr: number[] = new Array(WORD_LENGTH).fill(0);
	let count = 0;

	for (let i = 0; i < secretWord.length; i++) {
		if (secretWord[i] === guess[i]) {
			verifiedArr[i] = 2;
			count++;
		} else {
			secretWordMap[secretWord[i]] = (secretWordMap[secretWord[i]] || 0) + 1;
		}
	}

	if (count >= 5) {
		return verifiedArr;
	}

	for (let i = 0; i < guess.length; i++) {
		if (secretWordMap[guess[i]] > 0) {
			secretWordMap[guess[i]]--;
			verifiedArr[i] = 1;
		}
	}

	return verifiedArr;
};

const getIsLetter = (event: KeyboardEvent): boolean => {
	const charCode = event.key.toLowerCase().charCodeAt(0);
	return event.key.length === 1 && charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.charCodeAt(0);
};

export const characterKeyPress = (
	event: KeyboardEvent,
	guessesModel: TGuessesModel,
	secretWord: string | null,
) => {
	const { guesses } = guessesModel;
	let { isWinner } = guessesModel;
	if (!secretWord || isWinner || guesses.length > NUMBER_OF_GUESSES) return;
	const isLetter = getIsLetter(event);
	const currentGuess = guesses[guesses.length - 1] || '';
	if (currentGuess && event.key === 'Backspace') {
		guesses[guesses.length - 1] = currentGuess.slice(0, -1);
	} else if (event.key === 'Enter' && currentGuess.length === WORD_LENGTH) {
		isWinner = validateSecretWord(currentGuess, secretWord).every((val) => val === 2);
		guesses.push('');
	} else if (currentGuess?.length < WORD_LENGTH && isLetter) {
		guesses[guesses.length - 1] = currentGuess + event.key.toLowerCase();
	}
	wordleGameStore.update((state) => ({
		...state,
		guesses,
		isWinner,
	}));
};

export const resetGame = (secretWord: string) =>
	wordleGameStore.set({
		guesses: [''],
		isWinner: false,
		secretWord,
	});
