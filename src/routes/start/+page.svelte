<script lang="ts">
	import Board from '$lib/components/Board.svelte';
	import { BASE_URL } from '$lib/constants/wordle';
	import { getSecretWord } from '$lib/utils/wordle';
	import { secretWordStore, wordleGameStore } from '$src/stores/wordle';
	import Keyboard from '$lib/components/Keyboard.svelte';
	import { onMount } from 'svelte';

	$: isGameLoading = true;

	const fetchSecretWord = async () => {
		try {
			const res = await fetch(`${BASE_URL}/wordle`);
			const data = await res.json();
			if (data) {
				const secretWord = getSecretWord(data.words);
				secretWordStore.set(data.words);
				wordleGameStore.update((state) => ({ ...state, secretWord }));
				isGameLoading = false;
			} else {
				throw new Error('No data present');
			}
		} catch (e) {
			console.error(e);
		}
	};

	onMount(() => {
		fetchSecretWord();
	});
</script>

<svelte:head>
	<title>Wordle Clone: Start</title>
</svelte:head>

<h1>Start!</h1>

{#if isGameLoading}
	<h3>loading</h3>
{:else}
	<Board />
	<Keyboard />
{/if}

<style>
	h1,
	h3 {
		text-align: center;
		text-transform: uppercase;
	}
</style>
