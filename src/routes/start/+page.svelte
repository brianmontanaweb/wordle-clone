<script>
	import Board from 'src/shared/components/board.svelte';
	import CharItem from 'src/shared/components/charItem.svelte';
	import LineItem from 'src/shared/components/lineItem.svelte';
	import { WORD_LENGTH } from 'src/shared/constants/wordle';
	import { characterKeyPress, getSecretWord, verifySecretWord } from 'src/shared/utils/wordle';
	import { guessesStore, secretWordStore, wonGameStore } from 'src/stores/wordle';
	const base = `http://wordle-clone.com/api`;

	async function fetchSecretWord() {
		try {
			const res = await fetch(`${base}/wordle`);
			const data = await res.json();
			if (data) {
                const secretWord = getSecretWord(data);
                secretWordStore.update(() => secretWord);
				return secretWord;
			} else {
				throw new Error('No data present');
			}
		} catch (e) {
			console.error(e);
		}
	}

	let guesses;
	guessesStore.subscribe((value) => {
		guesses = value;
	});
    let winner;
    wonGameStore.subscribe(value => {
        winner = value;
    });
	let secretWordStart = fetchSecretWord();
    let secretWord;
    secretWordStore.subscribe(value => {
        secretWord = value;
    })
</script>

<svelte:head>
	<title>Wordle Clone: Start</title>
</svelte:head>

<svelte:window on:keyup={(event) => characterKeyPress(event, guesses, secretWord)} />

<h1>Start!</h1>

<Board>
    {#if winner}
        <h3>YOU WON!</h3>
        <h3>{secretWord}</h3>
    {:else}
	{#await secretWordStart}
		<h3>loading</h3>
	{:then data}
		{#if guesses.length}
			{#each guesses as word}
				{#if word && data}
					<LineItem>
						{#each verifySecretWord(word, data) as charState, idx}
							<CharItem {charState}>{word[idx]}</CharItem>
						{/each}
					</LineItem>
				{:else}
					<LineItem>
						{#each ''.padEnd(WORD_LENGTH) as char}
							<CharItem charState={null}>{char}</CharItem>
						{/each}
					</LineItem>
				{/if}
			{/each}
		{/if}
	{/await}
    {/if}
</Board>

<style>
	h1, h3 {
		text-align: center;
        text-transform: uppercase;
	}
</style>
