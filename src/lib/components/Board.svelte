<script lang="ts">
	import { wordleGameStore, type TGuessesModel, secretWordStore } from '$src/stores/wordle';
	import CharItem from '$lib/components/CharItem.svelte';
	import LineItem from '$lib/components/WordRow.svelte';
	import { NUMBER_OF_GUESSES, WORD_LENGTH } from '$lib/constants/wordle';
	import {
		characterKeyPress,
		getSecretWord,
		resetGame,
		validateSecretWord,
	} from '$lib/utils/wordle';

	let guessesModel: TGuessesModel;
	wordleGameStore.subscribe((state) => {
		guessesModel = state;
	});
	$: ({ guesses, isWinner, secretWord } = guessesModel);
	$: currentGuessIndex = guesses.length - 1;
	$: console.log(secretWord);
</script>

<svelte:window on:keyup={(event) => characterKeyPress(event, guessesModel, secretWord)} />

<section>
	{#if secretWord}
		{#each new Array(NUMBER_OF_GUESSES).fill('') as _, idx}
			{#if currentGuessIndex > idx && secretWord}
				<LineItem>
					{@const validatedSecretWord = validateSecretWord(guesses[idx], secretWord)}
					{#each guesses[idx] as charState, jdx}
						<CharItem charState={validatedSecretWord[jdx]}>
							{charState ?? ''}
						</CharItem>
					{/each}
				</LineItem>
			{:else}
				<LineItem>
					{#each ''.padEnd(WORD_LENGTH) as _, jdx}
						<CharItem>{guesses?.[idx]?.[jdx] ?? ''}</CharItem>
					{/each}
				</LineItem>
			{/if}
		{/each}
	{/if}
	<div class="results-container">
		{#if isWinner}
			<h3>You won!</h3>
			<button on:click={() => resetGame(getSecretWord($secretWordStore))}>New game</button>
		{:else if currentGuessIndex > WORD_LENGTH}
			<h3>You lost :(</h3>
			<h3>The word is {secretWord}</h3>
			<button on:click={() => resetGame(getSecretWord($secretWordStore))}>New game</button>
		{/if}
	</div>
</section>

<style>
	.results-container {
		text-align: center;
	}
</style>
