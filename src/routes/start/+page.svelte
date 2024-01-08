<script lang="ts">
	import Board from 'src/lib/components/Board.svelte';
	import CharItem from 'src/lib/components/CharItem.svelte';
	import LineItem from 'src/lib/components/WordRow.svelte';
	import { NUMBER_OF_GUESSES, WORD_LENGTH } from 'src/lib/constants/wordle';
	import { characterKeyPress, getSecretWord, verifySecretWord } from 'src/lib/utils/wordle';
	import {
		currentGuessStore,
		guessesStore,
		secretWordStore,
		wonGameStore
	} from 'src/stores/wordle';
	const base = `http://localhost:3000`;

	async function fetchSecretWord() {
		try {
			const res = await fetch(`${base}/wordle`);
			const data = await res.json();
			if (data) {
				const secretWord = getSecretWord(data.words);
				secretWordStore.update(() => secretWord);
				return secretWord;
			} else {
				throw new Error('No data present');
			}
		} catch (e) {
			console.error(e);
		}
	}

	let secretWordStart = fetchSecretWord();

	let guesses = new Array(NUMBER_OF_GUESSES).fill(null);
	guessesStore.subscribe((value) => {
		guesses = value;
	});
	let winner = false;
	wonGameStore.subscribe((value) => {
		winner = value;
	});
	let secretWord = '';
	secretWordStore.subscribe((value) => {
		secretWord = value;
	});
	let currentGuess = '';
	currentGuessStore.subscribe((value) => {
		currentGuess = value;
	});
	$: currentGuessIndex = guesses?.findIndex((guess) => guess == null);
	$: currentGuessChars = currentGuess;
</script>

<svelte:head>
	<title>Wordle Clone: Start</title>
</svelte:head>

<svelte:window on:keyup={(event) => characterKeyPress(event, guesses, secretWord)} />

<h1>Start!</h1>

<Board>
	{#await secretWordStart}
		<h3>loading</h3>
	{:then data}
		{#if guesses.length}
			{#each guesses as word, idx}
				{#if word && data}
					<LineItem>
						{#each verifySecretWord(word, data) as charState, jdx}
							<CharItem {charState}>
								{word[jdx]}
							</CharItem>
						{/each}
					</LineItem>
				{:else}
					<LineItem>
						{#each ''.padEnd(WORD_LENGTH) as _, jdx}
							<CharItem
								>{idx === currentGuessIndex && currentGuessChars[jdx]
									? currentGuessChars[jdx]
									: ''}</CharItem
							>
						{/each}
					</LineItem>
				{/if}
			{/each}
		{/if}
	{/await}
	{#if winner}
		<h3>YOU WON!</h3>
		<h3>{secretWord}</h3>
	{:else if currentGuessIndex === -1}
		<h3>You lost :(</h3>
		<h3>{secretWord}</h3>
	{/if}
</Board>

<style>
	h1,
	h3 {
		text-align: center;
		text-transform: uppercase;
	}
</style>
