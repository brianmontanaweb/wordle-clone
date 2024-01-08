<script lang="ts">
	import Board from 'src/lib/components/Board.svelte';
	import { BASE_URL } from 'src/lib/constants/wordle';
	import { getSecretWord } from 'src/lib/utils/wordle';
	import { secretWordStore } from 'src/stores/wordle';

	const fetchSecretWord = async () => {
		try {
			const res = await fetch(`${BASE_URL}/wordle`);
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
	};

	let secretWordStart = fetchSecretWord();
</script>

<svelte:head>
	<title>Wordle Clone: Start</title>
</svelte:head>

<h1>Start!</h1>

<Board {secretWordStart} />

<style>
	h1 {
		text-align: center;
		text-transform: uppercase;
	}
</style>
