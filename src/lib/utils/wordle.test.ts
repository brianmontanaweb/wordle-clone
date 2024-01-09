import { getSecretWord } from './wordle';

describe('getSecretWord', () => {
	const mockWords = [
		'ALBUM',
		'HINGE',
		'MONEY',
		'SCRAP',
		'GAMER',
		'GLASS',
		'SCOUR',
		'BEING',
		'DELVE',
		'YIELD',
		'METAL',
		'TIPSY',
		'SLUNG',
		'FARCE',
		'GECKO',
		'SHINE',
		'CANNY',
	];

	it('Returns a word from an optimistic input', () => {
		const secretWord = getSecretWord(mockWords);
		expect(secretWord.length).toBe(5);
	});

	it('Returns a word from an array with 1 element', () => {
		const secretWord = getSecretWord([mockWords[0]]);
		expect(secretWord).toBe('ALBUM');
	});
});
