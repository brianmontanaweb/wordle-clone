<script lang="ts">
	import {
		currentGuessStore,
		guessesStore,
		secretWordStore,
		wonGameStore,
	} from 'src/stores/wordle';
	import CharItem from 'src/lib/components/CharItem.svelte';
	import LineItem from 'src/lib/components/WordRow.svelte';
	import { NUMBER_OF_GUESSES, WORD_LENGTH } from '../constants/wordle';
	import { characterKeyPress, verifySecretWord } from '../utils/wordle';

	export let secretWordStart: Promise<string | undefined>;

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

<svelte:window on:keyup={(event) => characterKeyPress(event, guesses, secretWord)} />

<section>
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
	{:else if currentGuessIndex === -1}
		<h3>You lost :(</h3>
		<h3>Secret Word is {secretWord}</h3>
	{/if}
</section>

<style>
	h3 {
		text-align: center;
		text-transform: uppercase;
	}
</style>
